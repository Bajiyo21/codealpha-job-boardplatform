from django.urls import path
from .views import (
    JobCreateView,
    JobListView,
    JobDetailView,
    MyJobsView,
    JobUpdateView,
    JobDeleteView,
    DashboardStatsView,
)

urlpatterns = [
    # Public Jobs
    path("", JobListView.as_view(), name="job-list"),
    path("create/", JobCreateView.as_view(), name="job-create"),
    path("my/", MyJobsView.as_view(), name="my-jobs"),
    path("<int:pk>/", JobDetailView.as_view(), name="job-detail"),
    path("<int:pk>/update/", JobUpdateView.as_view(), name="job-update"),
    path("<int:pk>/delete/", JobDeleteView.as_view(), name="job-delete"),
    path("dashboard/stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
]