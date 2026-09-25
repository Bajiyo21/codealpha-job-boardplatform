from django.urls import path
from .views import (
    ApplyJobView,
    MyApplicationsView,
    WithdrawApplicationView,
    JobApplicantsView,
    UpdateApplicationStatusView,
)

urlpatterns = [
    path("apply/<int:job_id>/", ApplyJobView.as_view(), name="apply-job"),
    path("my/", MyApplicationsView.as_view(), name="my-applications"),
    path("<int:pk>/withdraw/", WithdrawApplicationView.as_view(), name="withdraw-application"),
    path("job/<int:job_id>/", JobApplicantsView.as_view(), name="job-applicants"),
    path("all/", JobApplicantsView.as_view(), name="all-applicants"),
    path("<int:pk>/status/", UpdateApplicationStatusView.as_view(), name="update-application-status"),
]