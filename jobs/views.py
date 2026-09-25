from rest_framework import generics, permissions, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from django.shortcuts import get_object_or_404

from .models import Job, SavedJob
from .serializers import JobSerializer, SavedJobSerializer
from applications.models import Application
from core.utils import api_response


class JobFilter(django_filters.FilterSet):
    min_salary = django_filters.NumberFilter(field_name="salary", lookup_expr="gte")
    max_salary = django_filters.NumberFilter(field_name="salary", lookup_expr="lte")
    title = django_filters.CharFilter(lookup_expr="icontains")
    location = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Job
        fields = [
            "job_type",
            "work_mode",
            "status",
            "is_featured",
            "location",
            "min_salary",
            "max_salary",
        ]


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = JobFilter
    search_fields = [
        "title",
        "description",
        "skills_required",
        "company__company_name",
        "location",
    ]
    ordering_fields = [
        "created_at",
        "salary",
        "views_count",
    ]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Job.objects.filter(status="published").select_related("company")
        return queryset


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all().select_related("company")
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=["views_count"])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != "employer":
            raise PermissionDenied("Only employers can post jobs.")
        if not hasattr(user, "company"):
            from companies.models import Company
            Company.objects.create(
                owner=user,
                company_name=f"{user.name}'s Company",
                industry="Technology",
                location="Remote",
                description="Default company profile."
            )

        serializer.save(company=user.company)


class MyJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != "employer":
            raise PermissionDenied("Only employers can view their jobs.")
        return Job.objects.filter(company__owner=self.request.user).order_by("-created_at")


class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(company__owner=self.request.user)


class JobDeleteView(generics.DestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(company__owner=self.request.user)


class SavedJobToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, job_id):
        job = get_object_or_404(Job, pk=job_id)
        saved_item, created = SavedJob.objects.get_or_create(user=request.user, job=job)

        if not created:
            saved_item.delete()
            return api_response(
                success=True,
                message="Job removed from saved jobs",
                data={"is_saved": False}
            )

        return api_response(
            success=True,
            message="Job saved successfully",
            data={"is_saved": True}
        )


class SavedJobListView(generics.ListAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user).select_related("job", "job__company")


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != "employer":
            raise PermissionDenied("Only employers can access employer dashboard statistics.")

        company = getattr(request.user, "company", None)
        if not company:
            return api_response(
                success=True,
                message="No company profile found",
                data={
                    "statistics": {
                        "total_jobs": 0,
                        "active_jobs": 0,
                        "total_applications": 0,
                        "pending": 0,
                        "shortlisted": 0,
                        "interview": 0,
                        "rejected": 0,
                        "hired": 0,
                    },
                    "recent_jobs": [],
                    "recent_applicants": [],
                }
            )

        jobs = Job.objects.filter(company=company)
        applications = Application.objects.filter(job__company=company)
        latest_jobs = jobs.order_by("-created_at")[:5]

        latest_apps = applications.select_related("candidate", "job").order_by("-applied_at")[:5]
        latest_apps_data = [
            {
                "id": app.id,
                "candidate_name": app.candidate.name,
                "candidate_email": app.candidate.email,
                "job_title": app.job.title,
                "status": app.status,
                "applied_at": app.applied_at,
            }
            for app in latest_apps
        ]

        return api_response(
            success=True,
            message="Dashboard statistics retrieved",
            data={
                "statistics": {
                    "total_jobs": jobs.count(),
                    "active_jobs": jobs.filter(status="published").count(),
                    "total_applications": applications.count(),
                    "pending": applications.filter(status="pending").count(),
                    "reviewing": applications.filter(status="reviewing").count(),
                    "shortlisted": applications.filter(status="shortlisted").count(),
                    "interview": applications.filter(status="interview").count(),
                    "rejected": applications.filter(status="rejected").count(),
                    "hired": applications.filter(status="hired").count(),
                },
                "recent_jobs": JobSerializer(latest_jobs, many=True, context={"request": request}).data,
                "recent_applicants": latest_apps_data,
            }
        )