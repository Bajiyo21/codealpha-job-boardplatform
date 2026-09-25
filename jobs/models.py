from django.db import models
from companies.models import Company


class Job(models.Model):
    JOB_TYPES = (
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("internship", "Internship"),
        ("contract", "Contract"),
    )

    WORK_MODES = (
        ("onsite", "On-site"),
        ("hybrid", "Hybrid"),
        ("remote", "Remote"),
    )

    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("published", "Published"),
        ("closed", "Closed"),
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    skills_required = models.TextField(blank=True, default="React, Django, Python, JavaScript")

    location = models.CharField(max_length=150)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES, default="full_time")
    work_mode = models.CharField(max_length=20, choices=WORK_MODES, default="onsite")

    salary = models.PositiveIntegerField(help_text="Annual salary in USD or INR")
    experience = models.CharField(max_length=50, default="1-3 years")

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="published")
    is_featured = models.BooleanField(default=False)
    views_count = models.PositiveIntegerField(default=0)

    deadline = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.company.company_name}"


class SavedJob(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="saved_jobs"
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="saved_by_users"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} saved {self.job.title}"