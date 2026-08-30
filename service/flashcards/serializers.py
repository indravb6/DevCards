from rest_framework import serializers

from .models import Category, FlashCard, Skill


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "icon", "slug"]


class SkillSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Skill
        fields = ["id", "name", "icon", "slug", "category"]


class FlashCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashCard
        fields = [
            "id",
            "question",
            "answer",
            "learn_more",
        ]
