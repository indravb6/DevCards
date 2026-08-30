import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <p className="text-xs text-zinc-400">© {new Date().getFullYear()} DevCards</p>

        <nav className="flex items-center gap-5 text-sm text-zinc-500">
          <Link href="/about" className="transition-colors hover:text-zinc-900">
            About
          </Link>

          <a
            href="mailto:mindrar96@gmail.com?subject=DevCards%20Feedback"
            className="transition-colors hover:text-zinc-900"
          >
            Feedback
          </a>

          <a
            href="https://github.com/indravb6/DevCards"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
