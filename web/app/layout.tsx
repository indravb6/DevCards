import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevCards",
    template: "%s | DevCards",
  },
  description: "Learn and review software engineering concepts with DevCards.",
  applicationName: "DevCards",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DevCards",
    statusBarStyle: "default",
  },
};

const themeScript = `
(function () {
  try {
    const theme = localStorage.getItem("theme");

    const isDark =
      theme === "dark" ||
      (!theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  } catch {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
