from rest_framework import serializers
from .models import Application
from jobs.serializers import JobSerializer
from accounts.serializers import CandidateProfileSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    candidate_id = serializers.IntegerField(source="candidate.id", read_only=True)
    candidate_name = serializers.CharField(source="candidate.name", read_only=True)
    candidate_email = serializers.EmailField(source="candidate.email", read_only=True)
    candidate_phone = serializers.CharField(source="candidate.phone", read_only=True)
    candidate_avatar = serializers.SerializerMethodField()
    candidate_resume_url = serializers.SerializerMethodField()
    candidate_profile = serializers.SerializerMethodField()

    job_detail = JobSerializer(source="job", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)
    job_location = serializers.CharField(source="job.location", read_only=True)
    job_type = serializers.CharField(source="job.job_type", read_only=True)
    company_name = serializers.CharField(source="job.company.company_name", read_only=True)
    company_logo = serializers.SerializerMethodField()

    candidate_match_score = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            "id",
            "candidate_id",
            "candidate_name",
            "candidate_email",
            "candidate_phone",
            "candidate_avatar",
            "candidate_resume_url",
            "candidate_profile",
            "job",
            "job_detail",
            "job_title",
            "job_location",
            "job_type",
            "company_name",
            "company_logo",
            "cover_letter",
            "resume",
            "status",
            "interview_date",
            "employer_notes",
            "candidate_match_score",
            "applied_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "candidate_id",
            "candidate_name",
            "candidate_email",
            "candidate_phone",
            "candidate_avatar",
            "candidate_resume_url",
            "candidate_profile",
            "job_detail",
            "job_title",
            "job_location",
            "job_type",
            "company_name",
            "company_logo",
            "candidate_match_score",
            "applied_at",
            "updated_at",
        ]

    def get_candidate_avatar(self, obj):
        if obj.candidate and obj.candidate.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.candidate.avatar.url)
            return obj.candidate.avatar.url
        return None

    def get_candidate_resume_url(self, obj):
        # Return custom application resume if provided, else candidate profile resume
        resume_file = obj.resume or getattr(getattr(obj.candidate, 'profile', None), 'resume', None)
        if resume_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(resume_file.url)
            return resume_file.url
        return None

    def get_candidate_profile(self, obj):
        profile = getattr(obj.candidate, 'profile', None)
        if profile:
            return CandidateProfileSerializer(profile, context=self.context).data
        return None

    def get_company_logo(self, obj):
        if obj.job and obj.job.company and obj.job.company.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.job.company.logo.url)
            return obj.job.company.logo.url
        return None

    def get_candidate_match_score(self, obj):
        from core.ai_services import AIService
        profile = getattr(obj.candidate, 'profile', None)
        return AIService.calculate_candidate_match_score(profile, obj.job)