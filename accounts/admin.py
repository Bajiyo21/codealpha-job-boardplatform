from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, CandidateProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = (
        "id",
        "name",
        "email",
        "role",
        "is_verified",
        "is_staff",
        "date_joined",
    )
    list_filter = ("role", "is_verified", "is_staff", "is_active")
    ordering = ("-id",)
    search_fields = ("email", "name", "phone")

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal Info",
            {
                "fields": (
                    "name",
                    "phone",
                    "avatar",
                    "role",
                    "is_verified",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "name",
                    "phone",
                    "role",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "headline",
        "location",
        "experience",
        "completion_percentage",
        "created_at",
    )
    search_fields = ("user__email", "user__name", "headline", "skills", "location")
    list_filter = ("experience", "created_at")