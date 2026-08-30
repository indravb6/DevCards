"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import CardStack from "@/components/CardStack/CardStack";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { api } from "../../lib/api";
import { FlashCardData, SkillData } from "../../lib/model";

const PRELOAD_THRESHOLD = 3;
const PAGE_SIZE = 10;

type FlashCardProps = {
  skill: SkillData;
};

export default function FlashCard({ skill }: FlashCardProps) {
  const [cards, setCards] = useState<FlashCardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  const y = useMotionValue(0);

  // NEW
  const [hasMore, setHasMore] = useState(true);

  /*
   * Initial fetch
   */
  useEffect(() => {
    let cancelled = false;

    const loadInitialCards = async () => {
      const newCards = await api.getFlashcards(skill.slug, page);

      if (cancelled) return;

      setCards(newCards.results);
      setPage(1);
      setCurrentIndex(0);

      setHasMore(page < Math.ceil(newCards.count / PAGE_SIZE));
    };

    loadInitialCards();

    return () => {
      cancelled = true;
    };
  }, [skill.id]);

  /*
   * Fetch next page when approaching
   * the end of the current cards.
   */
  useEffect(() => {
    if (cards.length === 0) return;

    if (!hasMore) return;

    const remaining = cards.length - currentIndex - 1;

    if (remaining > PRELOAD_THRESHOLD) {
      return;
    }

    const nextPage = page + 1;

    let cancelled = false;

    const loadNextPage = async () => {
      const newCards = await api.getFlashcards(skill.slug, nextPage);

      if (cancelled) return;

      /*
       * No more cards available.
       */
      if (newCards.results.length === 0) {
        setHasMore(false);
        return;
      }

      setCards((current) => [...current, ...newCards.results]);

      setPage(nextPage);

      /*
       * If returned less than PAGE_SIZE,
       * this is the last page.
       */
      if (newCards.results.length < PAGE_SIZE) {
        setHasMore(false);
      }
    };

    loadNextPage();

    return () => {
      cancelled = true;
    };
  }, [currentIndex, cards.length, page, hasMore]);

  /*
   * Next card
   */
  const handleNext = () => {
    setCurrentIndex((current) => current + 1);

    y.set(0);
  };

  /*
   * Previous card
   */
  const handlePrev = () => {
    setCurrentIndex((current) => Math.max(current - 1, 0));

    y.set(0);
  };

  /*
   * Finished
   */
  const isFinished = cards.length > 0 && currentIndex >= cards.length;

  if (isFinished) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <a
              href={`/${skill.category.slug}`}
              className="
            flex
            items-center
            gap-2
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-700
          "
            >
              <ArrowLeft size={16} />

              <span className="capitalize">{skill.name}</span>
            </a>

            <span className="text-sm text-zinc-400">
              {isFinished
                ? `${cards.length} / ${cards.length}`
                : `${currentIndex + 1} / ${cards.length}`}
            </span>
          </div>

          {/* Card / Completed */}
          <div className="flex flex-1 items-center justify-center">
            {isFinished ? (
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">🎉</div>

                <h1 className="text-xl font-semibold text-zinc-900">All cards completed</h1>

                <p className="mt-2 text-sm text-zinc-500">You've finished this deck.</p>
              </div>
            ) : (
              <CardStack cards={cards} currentIndex={currentIndex} onNext={handleNext} y={y} />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 pb-4">
            <button
              type="button"
              onClick={handlePrev}
              className="
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-900
            disabled:pointer-events-none
            disabled:opacity-20
            cursor-pointer
          "
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isFinished}
              className="
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-900
            disabled:pointer-events-none
            disabled:opacity-20
            cursor-pointer
          "
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Loading
   */
  if (cards.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-400">Loading cards...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <a
            href={`/${skill.category.slug}`}
            className="
              flex
              items-center
              gap-2
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-700
            "
          >
            <ArrowLeft size={16} />
            <span className="capitalize">{skill.name}</span>
          </a>

          <span className="text-sm text-zinc-400">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* Card */}

        <div className="flex flex-1 items-center justify-center">
          <CardStack cards={cards} currentIndex={currentIndex} onNext={handleNext} y={y} />
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            type="button"
            onClick={async () => {
              handlePrev();
              y.set(-900);
              await animate(y, 0, {
                duration: 0.2,
                ease: "easeIn",
              });
            }}
            disabled={currentIndex === 0}
            className="
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-900
              disabled:pointer-events-none
              disabled:opacity-20
              cursor-pointer
            "
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={async () => {
              await animate(y, -900, {
                duration: 0.2,
                ease: "easeIn",
              });

              handleNext();
            }}
            className="
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-900
              cursor-pointer
            "
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
