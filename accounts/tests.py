from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import CandidateProfile

User = get_user_model()


class CandidateProfileAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="candidate@example.com",
            name="Alice Candidate",
            password="secret123",
            role="candidate",
        )
        self.client.force_authenticate(user=self.user)

    def test_profile_retrieve_creates_missing_profile(self):
        response = self.client.get("/api/auth/candidate/profile/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user_name"], "Alice Candidate")
        self.assertEqual(response.data["bio"], "")
        self.assertTrue(CandidateProfile.objects.filter(user=self.user).exists())

    def test_profile_update_accepts_bio_field(self):
        payload = {
            "education": "BSc Computer Science",
            "experience": "2 years",
            "skills": "Python, Django",
            "github": "https://github.com/alice",
            "linkedin": "https://linkedin.com/in/alice",
            "bio": "Software engineer with a focus on Python and Django.",
        }

        response = self.client.put(
            "/api/auth/candidate/profile/update/",
            payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["bio"], payload["bio"])
        self.assertEqual(self.user.profile.bio, payload["bio"])
