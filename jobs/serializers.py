from rest_framework import serializers
from .models import Job, SavedJob
from companies.serializers import CompanySerializer


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.company_name", read_only=True)
    company_logo = serializers.SerializerMethodField()
    company_location = serializers.CharField(source="company.location", read_only=True)
    company_industry = serializers.CharField(source="company.industry", read_only=True)
    company_is_verified = serializers.BooleanField(source="company.is_verified", read_only=True)
    applications_count = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "company_name",
            "company_logo",
            "company_location",
            "company_industry",
            "company_is_verified",
            "title",
            "description",
            "skills_required",
            "location",
            "job_type",
            "work_mode",
            "salary",
            "experience",
            "status",
            "is_featured",
            "views_count",
            "deadline",
            "applications_count",
            "is_saved",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "company",
            "company_name",
            "company_logo",
            "company_location",
            "company_industry",
            "company_is_verified",
            "applications_count",
            "is_saved",
            "views_count",
            "created_at",
            "updated_at",
        ]

    def get_company_logo(self, obj):
        if obj.company and obj.company.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.company.logo.url)
            return obj.company.logo.url
        return None

    def get_applications_count(self, obj):
        return obj.applications.count() if hasattr(obj, 'applications') else 0

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return SavedJob.objects.filter(user=request.user, job=obj).exists()
        return False

    def validate_salary(self, value):
        if value <= 0:
            raise serializers.ValidationError("Salary must be greater than zero.")
        return value


class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)

    class Meta:
        model = SavedJob
        fields = ["id", "job", "created_at"]
        read_only_fields = ["id", "created_at"]