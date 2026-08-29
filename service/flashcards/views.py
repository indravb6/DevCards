from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Category, FlashCard, Skill
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
        return Skill.objects.filter(category_id=self.kwargs["category_id"])


class SkillDetailView(APIView):
    def get(self, request, skill_id):
        try:
            skill = Skill.objects.get(id=skill_id)
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
        return FlashCard.objects.filter(skill_id=self.kwargs["skill_id"])
