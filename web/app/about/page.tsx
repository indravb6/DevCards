import { ArrowLeft, BookOpen, Brain, Code2, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back */}

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-zinc-500
            transition-colors
            hover:text-zinc-900
          "
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        {/* Header */}

        <div className="mt-16">
          <div className="flex items-center gap-3">
            <div className="group relative">
              <Image src="/icon.png" alt="DevCards" width={44} height={44} className="rounded-xl" />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-full
                  left-1/2
                  z-20
                  mb-2
                  w-max
                  max-w-xs
                  -translate-x-1/2
                  rounded-lg
                  bg-zinc-900
                  px-3
                  py-2
                  text-xs
                  leading-5
                  text-white
                  opacity-0
                  shadow-lg
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                <a
                  href="https://www.flaticon.com/free-icons/gambling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Gambling icons created by Abdul-Aziz - Flaticon
                </a>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">DevCards</h1>
          </div>

          <p className="mt-5 text-lg leading-8 text-zinc-600">
            A simple flashcard app for software engineers to learn, review, and strengthen their
            understanding of technical concepts.
          </p>
        </div>

        {/* What is DevCards */}

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-zinc-950">What is DevCards?</h2>

          <p className="mt-4 leading-7 text-zinc-600">
            DevCards turns software engineering concepts into small, focused flashcards. Instead of
            reading everything at once, you can review one concept at a time and build your
            knowledge gradually.
          </p>
        </section>

        {/* Philosophy */}

        <section className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <Brain className="size-5 text-zinc-700" />

            <h3 className="mt-4 font-semibold text-zinc-900">Learn</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Discover concepts across the software engineering ecosystem.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <BookOpen className="size-5 text-zinc-700" />

            <h3 className="mt-4 font-semibold text-zinc-900">Review</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Reinforce your knowledge with short, focused questions.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <Code2 className="size-5 text-zinc-700" />

            <h3 className="mt-4 font-semibold text-zinc-900">Build</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Understand the ideas behind the technology you use.
            </p>
          </div>
        </section>

        {/* Footer */}

        <div className="mt-16 border-t border-zinc-200 pt-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">Built for developers who keep learning.</p>

            <a
              href="https://github.com/indravb6/devCards"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-zinc-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-zinc-600
                transition
                hover:border-zinc-300
                hover:bg-zinc-100
                hover:text-zinc-900
              "
            >
              <GitBranch className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
