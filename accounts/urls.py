from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    CandidateProfileCreateView,
    CandidateProfileView,
    CandidateProfileUpdateView,
)

urlpatterns = [
    # Authentication
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    # User Profile
    path("profile/", ProfileView.as_view(), name="profile"),

    # Candidate Profile
    path(
        "candidate/profile/create/",
        CandidateProfileCreateView.as_view(),
        name="candidate-profile-create",
    ),
    path(
        "candidate/profile/",
        CandidateProfileView.as_view(),
        name="candidate-profile",
    ),
    path(
        "candidate/profile/update/",
        CandidateProfileUpdateView.as_view(),
        name="candidate-profile-update",
    ),
]