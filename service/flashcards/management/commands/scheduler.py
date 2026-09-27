# management/commands/scheduler.py

from apscheduler.schedulers.blocking import BlockingScheduler
from django.core.management import BaseCommand, call_command


def generate_flashcards():
    call_command("generate_flashcards")


class Command(BaseCommand):
    def handle(self, *args, **options):
        scheduler = BlockingScheduler()

        scheduler.add_job(
            generate_flashcards,
            "cron",
            hour=2,
            minute=0,
        )

        scheduler.start()
