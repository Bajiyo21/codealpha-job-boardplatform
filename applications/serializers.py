from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(
        source="candidate.name",
        read_only=True
    )

    candidate_email = serializers.EmailField(
        source="candidate.email",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    class Meta:
        model = Application
        fields = [
            "id",
            "candidate_name",
            "candidate_email",
            "company_name",
            "job_title",
            "cover_letter",
            "status",
            "applied_at",
        ]
        read_only_fields = [
            "candidate_name",
            "candidate_email",
            "company_name",
            "job_title",
            "applied_at",
        ]