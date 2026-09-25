from rest_framework import status, permissions
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Notification, ContactMessage
from .serializers import NotificationSerializer, ContactMessageSerializer
from .utils import api_response
from .ai_services import AIService
from jobs.models import Job


class NotificationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        unread_count = notifications.filter(is_read=False).count()
        return api_response(
            success=True,
            message="Notifications retrieved successfully",
            data={
                "notifications": serializer.data,
                "unread_count": unread_count,
            },
        )


class MarkNotificationReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk=None):
        if pk:
            notification = get_object_or_404(Notification, pk=pk, user=request.user)
            notification.is_read = True
            notification.save()
        else:
            Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)

        return api_response(
            success=True,
            message="Notification status updated",
            data=None
        )


class AIJobRecommendationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        active_jobs = Job.objects.filter(status="published").select_related("company").order_by("-created_at")
        recommendations = AIService.get_job_recommendations(request.user, active_jobs, limit=6)
        
        formatted_data = []
        for rec in recommendations:
            job = rec["job"]
            formatted_data.append({
                "id": job.id,
                "title": job.title,
                "company_name": job.company.company_name,
                "company_logo": job.company.logo.url if job.company.logo else None,
                "location": job.location,
                "job_type": job.job_type,
                "work_mode": getattr(job, 'work_mode', 'onsite'),
                "salary": job.salary,
                "experience": job.experience,
                "skills_required": job.skills_required,
                "created_at": job.created_at,
                "match_score": rec["match_score"],
            })

        return api_response(
            success=True,
            message="AI job recommendations generated",
            data=formatted_data
        )


class AISkillGapAnalysisView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, job_id):
        job = get_object_or_404(Job, pk=job_id)
        profile = getattr(request.user, 'profile', None)
        analysis = AIService.analyze_resume_skill_gap(profile, job)

        return api_response(
            success=True,
            message="Skill gap analysis complete",
            data=analysis
        )


class AICandidateMatchScoreView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, job_id, candidate_id):
        job = get_object_or_404(Job, pk=job_id)
        from accounts.models import CandidateProfile
        profile = CandidateProfile.objects.filter(user_id=candidate_id).first()
        score = AIService.calculate_candidate_match_score(profile, job)

        return api_response(
            success=True,
            message="Candidate match score calculated",
            data={"match_score": score}
        )


class ContactCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                success=True,
                message="Your message has been sent successfully! Our team will reach out shortly.",
                data=serializer.data,
                status_code=status.HTTP_201_CREATED
            )
        return api_response(
            success=False,
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
