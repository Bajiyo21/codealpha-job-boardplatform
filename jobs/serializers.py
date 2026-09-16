from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source="company.company_name",
        read_only=True
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "company_name",
            "title",
            "description",
            "location",
            "job_type",
            "salary",
            "experience",
            "deadline",
            "created_at",
        ]

        read_only_fields = ["company_name", "created_at"]

    def validate_salary(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Salary must be greater than zero."
            )
        return value