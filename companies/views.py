from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from .models import Company
from .serializers import CompanySerializer


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "employer":
            raise PermissionDenied("Only employers can create a company.")

        serializer.save(owner=self.request.user)


class CompanyDetailView(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.company


class CompanyUpdateView(generics.UpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.company