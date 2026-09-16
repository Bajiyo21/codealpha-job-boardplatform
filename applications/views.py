from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from jobs.models import Job
from .models import Application
from .serializers import ApplicationSerializer


# Candidate applies for a job
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "candidate":
            raise PermissionDenied("Only candidates can apply.")

        job = get_object_or_404(Job, pk=self.kwargs["job_id"])

        if Application.objects.filter(candidate=user, job=job).exists():
            raise PermissionDenied("You have already applied for this job.")

        serializer.save(candidate=user, job=job)


# Candidate views own applications
class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            candidate=self.request.user
        ).order_by("-applied_at")


# Employer views applicants
class JobApplicantsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role != "employer":
            raise PermissionDenied("Only employers can view applicants.")

        job = get_object_or_404(Job, pk=self.kwargs["job_id"])

        if job.company.owner != user:
            raise PermissionDenied("This job doesn't belong to you.")

        return Application.objects.filter(job=job)


# Employer updates status
class UpdateApplicationStatusView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            job__company__owner=self.request.user
        )