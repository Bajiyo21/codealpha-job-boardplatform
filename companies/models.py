from django.db import models
from django.conf import settings


class Company(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="company"
    )

    company_name = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=150)
    description = models.TextField()
    company_size = models.CharField(max_length=50, blank=True, default="11-50 employees")
    founded_year = models.IntegerField(blank=True, null=True, default=2020)
    is_verified = models.BooleanField(default=True)

    logo = models.ImageField(upload_to="company_logos/", blank=True, null=True)
    banner = models.ImageField(upload_to="company_banners/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name