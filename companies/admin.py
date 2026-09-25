from django.contrib import admin
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "company_name",
        "owner",
        "industry",
        "location",
        "company_size",
        "is_verified",
        "created_at",
    )
    list_filter = ("industry", "is_verified", "created_at")
    search_fields = ("company_name", "industry", "location", "owner__email")
    actions = ["make_verified", "unverify"]

    @admin.action(description="Mark selected companies as Verified")
    def make_verified(self, request, queryset):
        queryset.update(is_verified=True)

    @admin.action(description="Unverify selected companies")
    def unverify(self, request, queryset):
        queryset.update(is_verified=False)