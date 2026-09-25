from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.name", read_only=True)
    owner_email = serializers.EmailField(source="owner.email", read_only=True)
    logo_url = serializers.SerializerMethodField()
    banner_url = serializers.SerializerMethodField()
    active_jobs_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = [
            "id",
            "owner_name",
            "owner_email",
            "company_name",
            "industry",
            "website",
            "location",
            "description",
            "company_size",
            "founded_year",
            "is_verified",
            "logo",
            "banner",
            "logo_url",
            "banner_url",
            "active_jobs_count",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "owner_name", "owner_email"]

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None

    def get_banner_url(self, obj):
        if obj.banner:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.banner.url)
            return obj.banner.url
        return None

    def get_active_jobs_count(self, obj):
        return obj.jobs.filter(status="published").count() if hasattr(obj, 'jobs') else 0

    def validate_company_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Company name must be at least 2 characters.")
        return value