from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.name", read_only=True)

    class Meta:
        model = Company
        fields = [
            "id",
            "owner_name",
            "company_name",
            "industry",
            "website",
            "location",
            "description",
            "logo",
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def validate_company_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Company name is too short."
            )
        return value        