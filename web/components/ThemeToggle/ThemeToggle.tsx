"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const dark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;

    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");

    setIsDark(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="
          flex
          size-9
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-card
          text-muted-foreground
        "
        aria-label="Toggle theme"
      >
        <Sun className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        flex
        size-9
        cursor-pointer
        items-center
        justify-center
        rounded-full
        border
        border-border
        bg-card
        text-muted-foreground
        transition-all
        hover:bg-muted
        hover:text-foreground
        active:scale-95
      "
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Moon className="size-4.5" /> : <Sun className="size-4.5" />}
    </button>
  );
}
