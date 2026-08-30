"use client";

import Card from "@/components/Card/Card";
import { MotionValue } from "motion";
import { useMotionValue } from "motion/react";
import { FlashCardData } from "../../lib/model";

type CardStackProps = {
  cards: FlashCardData[];
  currentIndex: number;
  onNext: () => void;
  y: MotionValue<number>;
};

export default function CardStack({ cards, currentIndex, onNext, y }: CardStackProps) {
  const visibleCards = cards.slice(currentIndex, currentIndex + 3);
  const zeroY = useMotionValue(0);

  return (
    <div className="relative h-[420px] w-[320px]">
      {visibleCards
        .map((card, index) => {
          const isActive = index === 0;

          return (
            <div
              key={card.id}
              className="absolute inset-0"
              style={{
                zIndex: visibleCards.length - index,
              }}
            >
              <Card
                question={card.question}
                answer={card.answer}
                learnMore={card.learn_more}
                interactive={isActive}
                blurContent={!isActive}
                onNext={isActive ? onNext : undefined}
                y={isActive ? y : zeroY}
              />
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
