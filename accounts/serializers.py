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
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "role",
            "avatar",
            "avatar_url",
            "is_verified",
        ]

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None


class CandidateProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.name", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)
    user_phone = serializers.CharField(source="user.phone", read_only=True)
    user_role = serializers.CharField(source="user.role", read_only=True)
    avatar_url = serializers.SerializerMethodField()
    completion_percentage = serializers.ReadOnlyField()

    class Meta:
        model = CandidateProfile
        fields = [
            "id",
            "user_name",
            "user_email",
            "user_phone",
            "user_role",
            "avatar_url",
            "headline",
            "location",
            "education",
            "experience",
            "skills",
            "github",
            "linkedin",
            "portfolio",
            "bio",
            "resume",
            "completion_percentage",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "user_name", "user_email", "user_phone", "user_role", "completion_percentage"]

    def get_avatar_url(self, obj):
        if obj.user.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.user.avatar.url)
            return obj.user.avatar.url
        return None

    def validate_resume(self, value):
        if value and hasattr(value, 'name'):
            if not value.name.lower().endswith(".pdf"):
                raise serializers.ValidationError("Only PDF resumes are allowed.")
        return value