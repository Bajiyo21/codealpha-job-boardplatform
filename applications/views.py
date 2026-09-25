from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from jobs.models import Job
from .models import Application
from .serializers import ApplicationSerializer
from core.models import Notification
from core.utils import api_response


# Candidate applies for a job
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "candidate":
            raise PermissionDenied("Only candidates can apply for jobs.")

        job = get_object_or_404(Job, pk=self.kwargs["job_id"])

        if job.status == "closed":
            raise PermissionDenied("This job posting is closed.")

        if Application.objects.filter(candidate=user, job=job).exists():
            raise PermissionDenied("You have already applied for this job.")

        application = serializer.save(candidate=user, job=job)

        # Notify Employer
        if hasattr(job.company, 'owner'):
            Notification.objects.create(
                user=job.company.owner,
                title="New Job Application Received",
                message=f"{user.name} applied for '{job.title}'.",
                notification_type="new_applicant",
                link=f"/employer/dashboard"
            )


# Candidate views own applications
class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            candidate=self.request.user
        ).select_related("job", "job__company").order_by("-applied_at")


# Candidate withdraws application
class WithdrawApplicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        application = get_object_or_404(Application, pk=pk, candidate=request.user)
        application.delete()
        return api_response(
            success=True,
            message="Application withdrawn successfully",
            data=None
        )


# Employer views applicants for a specific job or all employer jobs
class JobApplicantsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status"]
    search_fields = ["candidate__name", "candidate__email", "cover_letter"]

    def get_queryset(self):
        user = self.request.user

        if user.role != "employer":
            raise PermissionDenied("Only employers can view applicants.")

        job_id = self.kwargs.get("job_id")
        if job_id:
            job = get_object_or_404(Job, pk=job_id)
            if job.company.owner != user:
                raise PermissionDenied("This job doesn't belong to your company.")
            return Application.objects.filter(job=job).select_related("candidate", "candidate__profile", "job")

        return Application.objects.filter(job__company__owner=user).select_related("candidate", "candidate__profile", "job")


# Employer updates applicant status & schedules interview
class UpdateApplicationStatusView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            job__company__owner=self.request.user
        )

    def perform_update(self, serializer):
        instance = serializer.save()

        # Send automated notification to candidate
        status_readable = instance.get_status_display()
        msg = f"Your application status for '{instance.job.title}' at {instance.job.company.company_name} was updated to '{status_readable}'."
        if instance.interview_date:
            msg += f" Interview date scheduled: {instance.interview_date.strftime('%b %d, %Y at %H:%M')}."

        Notification.objects.create(
            user=instance.candidate,
            title=f"Application Update: {status_readable}",
            message=msg,
            notification_type="application_status" if instance.status != "interview" else "interview",
            link="/candidate/dashboard"
        )