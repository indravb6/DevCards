from django.db.models import Exists, OuterRef
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Category, FlashCard, Skill, User, UserFlashCardProgress
from .serializers import (
    CategorySerializer,
    FlashCardSerializer,
    SkillSerializer,
)


class FlashCardPagination(PageNumberPagination):
    page_size = 10


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


class SkillListView(ListAPIView):
    serializer_class = SkillSerializer
    pagination_class = None

    def get_queryset(self):
        if "category_slug" not in self.kwargs:
            return Skill.objects.filter(
                name__icontains=self.request.query_params.get("search", "")
            ).order_by("name")[:10]

        return Skill.objects.filter(category__slug=self.kwargs["category_slug"])


class SkillDetailView(APIView):
    def get(self, request, skill_slug):
        try:
            skill = Skill.objects.get(slug=skill_slug)
        except Skill.DoesNotExist:
            return Response(
                {"detail": "Skill not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = SkillSerializer(skill)

        return Response(serializer.data)


class FlashCardListView(ListAPIView):
    queryset = FlashCard.objects.all()
    serializer_class = FlashCardSerializer
    pagination_class = FlashCardPagination

    def get_queryset(self):
        user_id = self.request.headers.get("x-user-id")
        if user_id:
            user = User.objects.get_or_create(user_id=user_id)[0]
            return (
                FlashCard.objects.filter(skill__slug=self.kwargs["skill_slug"])
                .filter(
                    ~Exists(
                        UserFlashCardProgress.objects.filter(
                            user=user, flashcard=OuterRef("id")
                        )
                    )
                )
                .order_by("?")
            )

        return FlashCard.objects.filter(skill__slug=self.kwargs["skill_slug"]).order_by(
            "?"
        )


class FlashCardFinishView(APIView):
    def post(self, request, flashcard_id):
        flashcard = FlashCard.objects.get(id=flashcard_id)

        user_id = request.headers.get("x-user-id")
        if not user_id:
            return Response(
                {
                    "detail": "Not marked as finished. User ID is missing in the request headers."
                },
                status=status.HTTP_200_OK,
            )

        user = User.objects.get_or_create(user_id=user_id)[0]

        UserFlashCardProgress.objects.update_or_create(user=user, flashcard=flashcard)

        return Response(
            {"detail": "FlashCard marked as finished."}, status=status.HTTP_200_OK
        )


class FlashCardRestartView(APIView):
    def post(self, request, skill_slug):
        user_id = request.headers.get("x-user-id")
        if not user_id:
            return Response(
                {"detail": "Not restarted. User ID is missing in the request headers."},
                status=status.HTTP_200_OK,
            )

        user = User.objects.get_or_create(user_id=user_id)[0]

        UserFlashCardProgress.objects.filter(
            user=user, flashcard__skill__slug=skill_slug
        ).delete()

        return Response(
            {"detail": "FlashCards restarted for the skill."}, status=status.HTTP_200_OK
        )
