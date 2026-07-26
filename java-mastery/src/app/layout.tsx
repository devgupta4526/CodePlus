import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ContentProtection } from "@/components/shared/ContentProtection";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodePulse — Interactive Java Learning Platform",
    template: "%s | CodePulse",
  },
  description:
    "Master Java from scratch with interactive lessons, code examples, quizzes, and visual diagrams. A premium learning experience for developers.",
  keywords: [
    "Java",
    "programming",
    "learn Java",
    "OOP",
    "coding",
    "tutorials",
    "interactive learning",
    "developer education",
  ],
  authors: [{ name: "CodePulse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "CodePulse — Interactive Java Learning Platform",
    description:
      "Master Java from scratch with interactive lessons, code examples, quizzes, and visual diagrams.",
    siteName: "CodePulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePulse — Interactive Java Learning Platform",
    description:
      "Master Java from scratch with interactive lessons, code examples, quizzes, and visual diagrams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className={`min-h-screen antialiased bg-[var(--bg)] text-[var(--text-primary)]`}
      >
        <ThemeProvider>
          <ContentProtection>{children}</ContentProtection>
        </ThemeProvider>
      </body>
    </html>
  );
}

