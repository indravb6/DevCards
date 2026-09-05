import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DevCards</p>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>

          <a
            href="mailto:mindrar96@gmail.com?subject=DevCards%20Feedback"
            className="transition-colors hover:text-foreground"
          >
            Feedback
          </a>

          <a
            href="https://github.com/indravb6/DevCards"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
