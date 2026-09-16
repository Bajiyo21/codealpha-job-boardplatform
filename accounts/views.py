from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from .models import User, CandidateProfile
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    CandidateProfileSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class CandidateProfileCreateView(generics.CreateAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "candidate":
            raise PermissionDenied("Only candidates can create profiles.")

        serializer.save(user=self.request.user)


class CandidateProfileView(generics.RetrieveAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class CandidateProfileUpdateView(generics.UpdateAPIView):
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile