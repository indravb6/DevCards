from django.urls import path

from .views import (
    CategoryListView,
    FlashCardFinishView,
    FlashCardListView,
    FlashCardRestartView,
    SkillDetailView,
    SkillListView,
)

urlpatterns = [
    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list",
    ),
    path(
        "categories/<str:category_slug>/skills/",
        SkillListView.as_view(),
        name="skill-list",
    ),
    path(
        "skills/<str:skill_slug>/flashcards/",
        FlashCardListView.as_view(),
        name="flashcard-list",
    ),
    path("skills/<str:skill_slug>/", SkillDetailView.as_view()),
    path(
        "flashcards/<uuid:flashcard_id>/finish/",
        FlashCardFinishView.as_view(),
        name="flashcard-finish",
    ),
    path(
        "skills/<str:skill_slug>/flashcards/restart/",
        FlashCardRestartView.as_view(),
        name="flashcard-restart",
    ),
]
