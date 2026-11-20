import type { Metadata } from "next";
import { Fraunces, Lora, DM_Sans, Caveat } from "next/font/google";
import { RomanticBackdrop } from "@/components/illustrations";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const letter = Lora({
  variable: "--font-letter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const handwritten = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Little Birthday Letter",
  description: "Make a personal birthday letter and share it as a little keepsake.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${letter.variable} ${sans.variable} ${handwritten.variable}`}>
        <RomanticBackdrop />
        {children}
      </body>
    </html>
  );
}
