import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

import { api } from "@/lib/api";
import { getIcon } from "../../lib/icons";

export default async function CategoriesPage() {
  const categories = await api.getCategories();

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-zinc-400">
            <BookOpen size={18} />
            <span className="text-sm font-medium">Flashcards</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Categories</h1>

          <p className="mt-2 text-sm text-zinc-500">Choose a topic to start learning.</p>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
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
                  bg-zinc-100
                  text-zinc-600
                  transition
                  group-hover:bg-zinc-900
                  group-hover:text-white
                "
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Name */}
                <div className="flex-1">
                  <h2 className="font-medium text-zinc-900">{category.name}</h2>
                </div>

                {/* Arrow */}
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
