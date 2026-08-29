from django.urls import path

from .views import (
    CategoryListView,
    FlashCardListView,
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
        "categories/<uuid:category_id>/skills/",
        SkillListView.as_view(),
        name="skill-list",
    ),
    path(
        "skills/<uuid:skill_id>/flashcards/",
        FlashCardListView.as_view(),
        name="flashcard-list",
    ),
    path("skills/<uuid:skill_id>", SkillDetailView.as_view()),
]
