from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# -----------------------------
# Custom User Manager
# -----------------------------
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, name, password, **extra_fields)


# -----------------------------
# Custom User Model
# -----------------------------
class User(AbstractUser):
    ROLE_CHOICES = (
        ("candidate", "Candidate"),
        ("employer", "Employer"),
    )

    username = None

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="candidate"
    )

    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    def __str__(self):
        return f"{self.name} ({self.role})"


# -----------------------------
# Candidate Profile Model
# -----------------------------
class CandidateProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    headline = models.CharField(max_length=200, blank=True, help_text="e.g. Senior React & Django Developer")
    location = models.CharField(max_length=150, blank=True)

    # Education & Experience
    education = models.CharField(max_length=250, blank=True)
    experience = models.CharField(max_length=150, blank=True)
    skills = models.TextField(blank=True)

    # About Candidate
    bio = models.TextField(blank=True)

    # Professional Links
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)

    # Resume Upload
    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.name

    @property
    def completion_percentage(self):
        fields_to_check = [
            self.headline,
            self.location,
            self.education,
            self.experience,
            self.skills,
            self.bio,
            self.github or self.linkedin or self.portfolio,
            self.resume,
            self.user.phone,
            self.user.avatar,
        ]
        completed = sum(1 for field in fields_to_check if field)
        return int((completed / len(fields_to_check)) * 100)