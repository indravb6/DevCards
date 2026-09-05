import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { api } from "@/lib/api";
import Footer from "../../components/Footer/Footer";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { getIcon } from "../../lib/icons";

type Props = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;

  const [categories, skills] = await Promise.all([
    api.getCategories(),
    api.getSkills(categorySlug),
  ]);

  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const Icon = getIcon(category.icon);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        <div className="flex items-center justify-between">
          {/* Back */}
          <Link
            href="/"
            className="
            mb-8
            inline-flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
            transition
            hover:text-foreground
          "
          >
            <ArrowLeft size={16} />
            Categories
          </Link>

          {/* Theme Toggle */}
          <div className="mb-4 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-foreground
              text-background
            "
          >
            <Icon size={22} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">{category.name}</h1>

          <p className="mt-2 text-sm text-muted-foreground">Choose a skill to start learning.</p>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon);

            return (
              <Link
                key={skill.id}
                href={`/flashcards/${skill.slug}`}
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
                <div
                  className="
                    flex
                    h-10
                    w-10
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
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <span className="flex-1 font-medium text-card-foreground">{skill.name}</span>

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
