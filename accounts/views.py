from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, CandidateProfile
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    CandidateProfileSerializer,
)
from .login_serializer import LoginSerializer


# ----------------------------
# Register API
# ----------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# ----------------------------
# Login API (JWT Authentication)
# ----------------------------
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )


# ----------------------------
# Logged-in User Profile
# ----------------------------
class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ----------------------------
# Candidate Profile Create
# ----------------------------
class CandidateProfileCreateView(generics.CreateAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "candidate":
            raise PermissionDenied("Only candidates can create profiles.")

        serializer.save(user=self.request.user)


# ----------------------------
# Candidate Profile View
# ----------------------------
class CandidateProfileView(generics.RetrieveAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = CandidateProfile.objects.get_or_create(user=self.request.user)
        return profile


class CandidateProfileUpdateView(generics.UpdateAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = CandidateProfile.objects.get_or_create(user=self.request.user)
        return profile

    def update(self, request, *args, **kwargs):
        user = request.user
        # Handle user fields update (name, phone, avatar) if passed
        if "name" in request.data:
            user.name = request.data["name"]
        if "phone" in request.data:
            user.phone = request.data["phone"]
        if "avatar" in request.FILES:
            user.avatar = request.FILES["avatar"]
        user.save()

        return super().update(request, *args, **kwargs)