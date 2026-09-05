"use client";

import { animate, motion, MotionValue, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type CardProps = {
  question: string;
  answer: string;
  learnMore?: string;
  onNext?: () => void;
  interactive?: boolean;
  blurContent?: boolean;
  y: MotionValue<number>;
};

export default function Card({
  question,
  answer,
  learnMore,
  onNext,
  interactive = true,
  blurContent = false,
  y,
}: CardProps) {
  const rotation = useMotionValue(0);
  const rotateZ = useTransform(y, [-500, 0, 500], [-6, 0, 6]);

  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const isPointerDown = useRef(false);
  const gestureDirection = useRef<"horizontal" | "vertical" | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const startRotation = useRef(0);

  /*
   * =====================================
   * POINTER DOWN
   * =====================================
   */

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }

    isPointerDown.current = true;
    gestureDirection.current = null;

    startX.current = event.clientX;
    startY.current = event.clientY;
    startRotation.current = rotation.get();

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  /*
   * =====================================
   * POINTER MOVE
   * =====================================
   */

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !isPointerDown.current) {
      return;
    }

    const deltaX = event.clientX - startX.current;
    const deltaY = event.clientY - startY.current;

    if (!gestureDirection.current) {
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        return;
      }

      gestureDirection.current = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }

    /*
     * Horizontal = flip
     */

    if (gestureDirection.current === "horizontal") {
      const deltaRotation = (deltaX / 300) * 180;

      rotation.set(startRotation.current + deltaRotation);

      return;
    }

    /*
     * Vertical = throw
     */

    if (gestureDirection.current === "vertical") {
      y.set(deltaY);
    }
  };

  /*
   * =====================================
   * POINTER UP
   * =====================================
   */

  const handlePointerUp = async (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !isPointerDown.current) {
      return;
    }

    isPointerDown.current = false;

    event.currentTarget.releasePointerCapture(event.pointerId);

    const direction = gestureDirection.current;

    /*
     * CLICK → FLIP
     */

    if (!direction) {
      const current = rotation.get();

      const normalized = ((current % 360) + 360) % 360;

      const isQuestion = normalized < 90 || normalized >= 270;

      const target = isQuestion ? normalized + 180 : normalized - 180;

      await animate(rotation, target, {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      });

      rotation.set(((target % 360) + 360) % 360);

      gestureDirection.current = null;

      return;
    }

    /*
     * VERTICAL → THROW
     */

    if (direction === "vertical") {
      const currentY = y.get();

      /*
       * Throw up
       */

      if (currentY < -100) {
        await animate(y, -900, {
          duration: 0.4,
          ease: "easeIn",
        });

        onNext?.();

        return;
      }

      /*
       * Throw down
       */

      if (currentY > 100) {
        await animate(y, 900, {
          duration: 0.4,
          ease: "easeIn",
        });

        onNext?.();

        return;
      }

      /*
       * Not enough movement
       */

      await animate(y, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });

      gestureDirection.current = null;

      return;
    }

    /*
     * HORIZONTAL → SNAP
     */

    if (direction === "horizontal") {
      const current = rotation.get();

      const target = Math.round(current / 180) * 180;

      await animate(rotation, target, {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      });

      rotation.set(((target % 360) + 360) % 360);

      gestureDirection.current = null;
    }
  };

  /*
   * =====================================
   * CLASSES
   * =====================================
   */

  const questionClass = blurContent
    ? "text-2xl font-semibold text-card-foreground blur-md"
    : "text-2xl font-semibold text-card-foreground";

  const answerClass = blurContent
    ? "text-lg leading-relaxed text-card-foreground blur-md"
    : "text-lg leading-relaxed text-card-foreground";

  const smallTextClass = blurContent ? "blur-sm" : "";

  return (
    <>
      {/* =================================
          CARD
      ================================= */}

      <motion.div
        className="
          h-[420px]
          w-[320px]
          select-none
          touch-none
          cursor-grab
          active:cursor-grabbing
        "
        style={{
          y,
          rotate: rotateZ,
          perspective: 1200,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="relative h-full w-full"
          style={{
            rotateY: rotation,
            transformStyle: "preserve-3d",
          }}
        >
          {/* =================================
              QUESTION
          ================================= */}

          <div
            className="
              absolute
              inset-0
              flex
              h-full
              w-full
              flex-col
              rounded-3xl
              border
              border-border
              bg-card
              p-8
              shadow-xl
              [backface-visibility:hidden]
            "
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium text-muted-foreground ${smallTextClass}`} />

              <span
                className={`
                  rounded-full
                  bg-muted
                  px-3
                  py-1
                  text-xs
                  text-muted-foreground
                  ${smallTextClass}
                `}
              >
                Concept
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center text-center">
              <h2 className={questionClass}>{question}</h2>
            </div>

            <p
              className={`
                text-center
                text-sm
                text-muted-foreground
                ${smallTextClass}
              `}
            >
              Click or swipe ← →
            </p>
          </div>

          {/* =================================
              ANSWER
          ================================= */}

          <div
            className="
              absolute
              inset-0
              flex
              h-full
              w-full
              flex-col
              rounded-3xl
              border
              border-border
              bg-card
              p-8
              text-card-foreground
              shadow-xl
              [backface-visibility:hidden]
            "
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            <span
              className={`
                text-sm
                font-medium
                text-muted-foreground
                ${smallTextClass}
              `}
            >
              Answer
            </span>

            <div className="flex flex-1 items-center justify-center text-center">
              <p className={answerClass}>{answer}</p>
            </div>

            {/* Learn More */}

            {learnMore && (
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsLearnMoreOpen(true);
                }}
                className="
                  mx-auto
                  mb-3
                  cursor-pointer
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  text-muted-foreground
                  transition
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                Learn more
              </button>
            )}

            <p
              className={`
                text-center
                text-sm
                text-muted-foreground
                ${smallTextClass}
              `}
            >
              Swipe ↑ ↓ for next
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* =================================
          LEARN MORE MODAL
      ================================= */}

      {isLearnMoreOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setIsLearnMoreOpen(false)}
        >
          <div
            className="
              flex
              max-h-[80vh]
              w-full
              max-w-2xl
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-card
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Sticky Header */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                shrink-0
                items-start
                justify-between
                gap-4
                border-b
                border-border
                bg-card
                px-8
                py-6
              "
            >
              <h2 className="text-xl font-semibold leading-7 text-foreground">{question}</h2>

              <button
                type="button"
                onClick={() => setIsLearnMoreOpen(false)}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  text-xl
                  leading-none
                  text-muted-foreground
                  transition
                  hover:bg-muted
                  hover:text-foreground
                "
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Scrollable Content */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-8
                py-6
              "
            >
              <article
                className="
                  max-w-none
                  text-[15px]
                  leading-7
                  text-foreground

                  [&_h1]:mb-4
                  [&_h1]:text-2xl
                  [&_h1]:font-bold
                  [&_h1]:text-foreground

                  [&_h2]:mb-3
                  [&_h2]:text-xl
                  [&_h2]:font-bold
                  [&_h2]:text-foreground

                  [&_h3]:mb-2
                  [&_h3]:mt-6
                  [&_h3]:text-lg
                  [&_h3]:font-semibold
                  [&_h3]:text-foreground

                  [&_p]:mb-4
                  [&_p]:text-foreground

                  [&_strong]:font-semibold
                  [&_strong]:text-foreground

                  [&_ul]:mb-4
                  [&_ul]:list-disc
                  [&_ul]:pl-6

                  [&_ol]:mb-4
                  [&_ol]:list-decimal
                  [&_ol]:pl-6

                  [&_li]:mb-1
                  [&_li]:text-foreground

                  [&_blockquote]:my-4
                  [&_blockquote]:border-l-4
                  [&_blockquote]:border-border
                  [&_blockquote]:pl-4
                  [&_blockquote]:text-muted-foreground

                  [&_code]:rounded
                  [&_code]:bg-muted
                  [&_code]:px-1.5
                  [&_code]:py-0.5
                  [&_code]:font-mono
                  [&_code]:text-sm
                  [&_code]:text-foreground

                  [&_pre]:my-5
                  [&_pre]:overflow-x-auto
                  [&_pre]:rounded-xl
                  [&_pre]:bg-slate-900
                  [&_pre]:p-4
                  [&_pre]:text-sm
                  [&_pre]:leading-6
                  [&_pre]:text-slate-100

                  [&_pre_code]:bg-transparent
                  [&_pre_code]:p-0
                  [&_pre_code]:text-slate-100
                "
              >
                <ReactMarkdown>{learnMore}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
