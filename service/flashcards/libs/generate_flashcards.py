from django.db import transaction
from django.db.models import Count

from flashcards.libs.gemini import generate_flashcards
from flashcards.models import FlashCard, Skill

CARDS_PER_RUN = 10


def generate_skill_flashcards(skill: Skill) -> int:
    existing_questions = list(
        FlashCard.objects.filter(skill=skill).values_list("question", flat=True)
    )

    generated_cards = generate_flashcards(
        skill_name=skill.name,
        existing_questions=existing_questions,
        count=CARDS_PER_RUN,
    )

    if len(generated_cards) != CARDS_PER_RUN:
        raise ValueError(
            f"Expected {CARDS_PER_RUN} cards, "
            f"but Gemini returned {len(generated_cards)}"
        )

    with transaction.atomic():
        FlashCard.objects.bulk_create(
            [
                FlashCard(
                    skill=skill,
                    question=card.question,
                    answer=card.answer,
                    learn_more=card.learn_more,
                )
                for card in generated_cards
            ]
        )

    return len(generated_cards)


def generate_flashcards_for_all_skills() -> dict:
    skills = Skill.objects.annotate(flashcard_count=Count("flashcards")).order_by(
        "flashcard_count", "name"
    )

    generated_count = 0

    for skill in skills:
        try:
            count = generate_skill_flashcards(skill)

            generated_count += count

            print(
                f"[OK] {skill.name}: "
                f"generated {count} card(s) "
                f"(before: {skill.flashcard_count})"
            )

        except Exception as error:
            print(f"[ERROR] {skill.name}: {error}")
            raise

    return {
        "generated": generated_count,
    }
