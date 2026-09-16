from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from .models import Job
from .serializers import JobSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from applications.models import Application
from rest_framework.response import Response

class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "employer":
            raise PermissionDenied("Only employers can post jobs.")

        serializer.save(company=user.company)


class JobListView(generics.ListAPIView):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Filters
    filterset_fields = [
        "job_type",
        "location",
    ]

    # Search by job title
    search_fields = [
        "title",
        "company__company_name",
    ]

    # Order jobs
    ordering_fields = [
        "salary",
        "created_at",
    ]


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

class MyJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != "employer":
            raise PermissionDenied("Only employers can view their jobs.")

        return Job.objects.filter(
            company__owner=self.request.user
        ).order_by("-created_at")


class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            company__owner=self.request.user
        )


class JobDeleteView(generics.DestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            company__owner=self.request.user
        )


class DashboardStatsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != "employer":
            raise PermissionDenied("Only employers can access dashboard.")

        company = request.user.company

        jobs = Job.objects.filter(company=company)
        applications = Application.objects.filter(job__company=company)

        latest_jobs = jobs.order_by("-created_at")[:5]

        return Response({
            "statistics": {
                "total_jobs": jobs.count(),
                "total_applications": applications.count(),
                "pending": applications.filter(status="pending").count(),
                "shortlisted": applications.filter(status="shortlisted").count(),
                "rejected": applications.filter(status="rejected").count(),
                "hired": applications.filter(status="hired").count(),
            },
            "recent_jobs": JobSerializer(
                latest_jobs,
                many=True
            ).data
        })