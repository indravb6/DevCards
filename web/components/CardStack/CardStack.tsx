"use client";

import Card from "@/components/Card/Card";
import { FlashCardData } from "../../lib/model";

type CardStackProps = {
  cards: FlashCardData[];
  currentIndex: number;
  onNext: () => void;
};

export default function CardStack({ cards, currentIndex, onNext }: CardStackProps) {
  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

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
              />
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
