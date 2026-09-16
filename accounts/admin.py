from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .models import CandidateProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = (
        "id",
        "name",
        "email",
        "role",
        "is_staff",
    )

    ordering = ("id",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "CareerNest Info",
            {
                "fields": (
                    "name",
                    "phone",
                    "role",
                    "is_verified",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "CareerNest Info",
            {
                "fields": (
                    "name",
                    "email",
                    "phone",
                    "role",
                )
            },
        ),
    )
@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "education",
        "experience",
    ) 