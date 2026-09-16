from django.db import models
from companies.models import Company


class Job(models.Model):
    JOB_TYPES = (
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("internship", "Internship"),
        ("remote", "Remote"),
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    location = models.CharField(max_length=150)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)

    salary = models.PositiveIntegerField()
    experience = models.CharField(max_length=50)

    deadline = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title