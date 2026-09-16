from django.urls import path
from .views import (
    CompanyCreateView,
    CompanyDetailView,
    CompanyUpdateView,
)

urlpatterns = [
    path("create/", CompanyCreateView.as_view(), name="company-create"),
    path("me/", CompanyDetailView.as_view(), name="company-detail"),
    path("update/", CompanyUpdateView.as_view(), name="company-update"),
]