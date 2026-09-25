from django.contrib import admin
from .models import Job, SavedJob


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "company",
        "job_type",
        "work_mode",
        "salary",
        "status",
        "is_featured",
        "views_count",
        "deadline",
        "created_at",
    )
    list_filter = ("status", "job_type", "work_mode", "is_featured", "created_at")
    search_fields = ("title", "description", "company__company_name", "skills_required", "location")
    actions = ["mark_featured", "unmark_featured", "close_jobs"]

    @admin.action(description="Mark selected jobs as Featured")
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description="Unmark selected jobs as Featured")
    def unmark_featured(self, request, queryset):
        queryset.update(is_featured=False)

    @admin.action(description="Close selected job postings")
    def close_jobs(self, request, queryset):
        queryset.update(status="closed")


@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "job", "created_at")
    search_fields = ("user__email", "job__title")