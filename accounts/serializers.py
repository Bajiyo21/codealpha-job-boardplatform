from rest_framework import serializers
from .models import User
from .models import CandidateProfile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "role",
            "password",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user


# ADD THIS BELOW RegisterSerializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "role",
            "is_verified",
        ]
class CandidateProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(
        source="user.name",
        read_only=True
    )

    class Meta:
        model = CandidateProfile
        fields = [
            "id",
            "user_name",
            "skills",
            "education",
            "experience",
            "resume",
            "bio",
            "created_at",
        ]

        read_only_fields = ["created_at", "user_name"]

    def validate_resume(self, value):
        if value:
            if not value.name.endswith(".pdf"):
                raise serializers.ValidationError(
                    "Only PDF resumes are allowed."
                )
        return value