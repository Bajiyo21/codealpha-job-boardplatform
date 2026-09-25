from rest_framework import generics, permissions, filters
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import Company
from .serializers import CompanySerializer


class PublicCompanyListView(generics.ListAPIView):
    queryset = Company.objects.all().order_by("-created_at")
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["industry", "location"]
    search_fields = ["company_name", "industry", "location", "description"]


class PublicCompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "employer":
            raise PermissionDenied("Only employers can create a company.")
        if Company.objects.filter(owner=self.request.user).exists():
            raise PermissionDenied("You already own a company.")

        serializer.save(owner=self.request.user)


class MyCompanyDetailView(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company, _ = Company.objects.get_or_create(
            owner=self.request.user,
            defaults={
                "company_name": f"{self.request.user.name}'s Company",
                "industry": "Technology",
                "location": "Remote",
                "description": "Innovative company building the future.",
            }
        )
        return company


class MyCompanyUpdateView(generics.UpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company, _ = Company.objects.get_or_create(
            owner=self.request.user,
            defaults={
                "company_name": f"{self.request.user.name}'s Company",
                "industry": "Technology",
                "location": "Remote",
                "description": "Innovative company building the future.",
            }
        )
        return company