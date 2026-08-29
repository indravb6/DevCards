from django.core.management.base import BaseCommand

from flashcards.libs.generate_flashcards import generate_flashcards_for_all_skills


class Command(BaseCommand):
    help = "Generate 10 new flashcards for every skill using Gemini"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting flashcard generation..."))

        result = generate_flashcards_for_all_skills()

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS(f"Generated: {result['generated']}"))

        self.stdout.write(f"Failed skills: {result['failed']}")
