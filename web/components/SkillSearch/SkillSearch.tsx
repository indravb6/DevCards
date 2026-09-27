"use client";

import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { api } from "@/lib/api";
import { SkillData } from "@/lib/model";

export default function SkillSearch() {
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(false);

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const search = async () => {
      const value = debouncedQuery.trim();

      if (!value) {
        setSkills([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const results = await api.searchSkills(value);
        setSkills(results);
      } catch {
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

  const showDropdown = query.trim().length > 0;

  return (
    <div className="relative mt-4">
      {/* Search input */}
      <div className="relative">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills..."
          className="
            w-full rounded-lg border border-border
            bg-background
            py-2 pl-9 pr-10
            outline-none
            transition
            focus:border-foreground
          "
        />

        {loading && (
          <Loader2
            size={17}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              animate-spin
              text-muted-foreground
            "
          />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="
            absolute left-0 right-0 top-full z-10 mt-2
            overflow-hidden rounded-lg
            border border-border
            bg-card
            shadow-sm
          "
        >
          {loading ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">Searching...</div>
          ) : skills.length > 0 ? (
            <div className="p-2">
              {skills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/flashcards/${skill.slug}`}
                  onClick={() => setQuery("")}
                  className="
                    block rounded-md px-3 py-2
                    text-sm
                    hover:bg-muted
                  "
                >
                  {skill.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No skills found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
