from django.urls import path
from .views import (
    PublicCompanyListView,
    PublicCompanyDetailView,
    CompanyCreateView,
    MyCompanyDetailView,
    MyCompanyUpdateView,
)

urlpatterns = [
    path("", PublicCompanyListView.as_view(), name="company-list"),
    path("<int:pk>/", PublicCompanyDetailView.as_view(), name="company-public-detail"),
    path("create/", CompanyCreateView.as_view(), name="company-create"),
    path("me/", MyCompanyDetailView.as_view(), name="company-detail"),
    path("update/", MyCompanyUpdateView.as_view(), name="company-update"),
]