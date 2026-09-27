import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

import { api } from "@/lib/api";

import Footer from "../components/Footer/Footer";
import SkillSearch from "../components/SkillSearch/SkillSearch";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { getIcon } from "../lib/icons";

export default async function HomePage() {
  const categories = await api.getCategories();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        {/* Header */}
        <div className="relative mb-10">
          {/* Theme Toggle */}
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>

          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <BookOpen size={18} />
            <span className="text-sm font-medium">Flashcards</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            What do you want to learn?
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">Pick a category to start learning.</p>

          <SkillSearch />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = getIcon(category.icon);

            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  px-5
                  py-4
                  transition
                  hover:-translate-y-0.5
                  hover:border-border
                  hover:shadow-sm
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-muted
                    text-muted-foreground
                    transition
                    group-hover:bg-foreground
                    group-hover:text-background
                  "
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Name */}
                <div className="flex-1">
                  <h2 className="font-medium text-card-foreground">{category.name}</h2>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={18}
                  className="
                    text-muted-foreground/50
                    transition
                    group-hover:translate-x-1
                    group-hover:text-muted-foreground
                  "
                />
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
