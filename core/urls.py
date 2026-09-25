from django.urls import path
from .views import (
    NotificationListView,
    MarkNotificationReadView,
    AIJobRecommendationsView,
    AISkillGapAnalysisView,
    AICandidateMatchScoreView,
    ContactCreateView,
)

urlpatterns = [
    path("notifications/", NotificationListView.as_view(), name="notification-list"),
    path("notifications/mark-read/", MarkNotificationReadView.as_view(), name="notification-mark-all-read"),
    path("notifications/<int:pk>/mark-read/", MarkNotificationReadView.as_view(), name="notification-mark-read"),
    
    path("ai/recommendations/", AIJobRecommendationsView.as_view(), name="ai-recommendations"),
    path("ai/skill-gap/<int:job_id>/", AISkillGapAnalysisView.as_view(), name="ai-skill-gap"),
    path("ai/match-score/<int:job_id>/<int:candidate_id>/", AICandidateMatchScoreView.as_view(), name="ai-match-score"),
    
    path("contact/", ContactCreateView.as_view(), name="contact-create"),
]
