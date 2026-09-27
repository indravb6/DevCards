import uuid

from django.db import models


class BaseModel(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default="Code2")

    class Meta:
        ordering = ["name"]
        db_table = "categories"

    def __str__(self):
        return self.name


class Skill(BaseModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    icon = models.CharField(max_length=50, default="Code2")

    class Meta:
        ordering = ["name"]
        db_table = "skills"
        constraints = [
            models.UniqueConstraint(
                fields=["category", "slug"],
                name="unique_skill_per_category",
            ),
        ]

    def __str__(self):
        return f"{self.category.name} / {self.name}"


class FlashCard(BaseModel):
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="flashcards",
    )
    question = models.TextField()
    answer = models.TextField()
    learn_more = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["created_at"]
        db_table = "flashcards"

    def __str__(self):
        return self.question[:80]


class User(BaseModel):
    user_id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)

    class Meta:
        db_table = "users"

    def __str__(self):
        return str(self.user_id)


class UserFlashCardProgress(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="flashcard_progress",
    )
    flashcard = models.ForeignKey(
        FlashCard,
        on_delete=models.CASCADE,
        related_name="user_progress",
    )
    status = models.CharField(
        max_length=20,
        choices=[("learned", "Learned")],
        default="learned",
    )

    class Meta:
        db_table = "user_flashcard_progress"
        unique_together = ("user", "flashcard")

    def __str__(self):
        return f"{self.user.user_id} - {self.flashcard.id} - Learned: {self.is_learned}"
