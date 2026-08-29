import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { api } from "@/lib/api";
import { getIcon } from "../../../lib/icons";

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const [categories, skills] = await Promise.all([api.getCategories(), api.getSkills(categoryId)]);

  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    notFound();
  }

  const Icon = getIcon(category.icon);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        {/* Back */}
        <Link
          href="/categories"
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-700
          "
        >
          <ArrowLeft size={16} />
          Categories
        </Link>

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
              bg-zinc-900
              text-white
            "
          >
            <Icon size={22} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">{category.name}</h1>

          <p className="mt-2 text-sm text-zinc-500">Choose a skill to start learning.</p>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <Link
                key={skill.id}
                href={`/flashcards/${skill.id}`}
                className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-zinc-200
                bg-white
                px-5
                py-4
                transition
                hover:-translate-y-0.5
                hover:border-zinc-300
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
                  bg-zinc-100
                  text-zinc-500
                  transition
                  group-hover:bg-zinc-900
                  group-hover:text-white
                "
                >
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <span className="flex-1 font-medium text-zinc-900">{skill.name}</span>

                <ArrowRight
                  size={18}
                  className="
                  text-zinc-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-zinc-600
                "
                />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
