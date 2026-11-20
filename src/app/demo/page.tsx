import type { Metadata } from "next";
import { RecipientLetter } from "@/components/recipient-letter";
import type { BirthdayLetter } from "@/lib/letter";

export const metadata: Metadata = {
  title: "Try the envelope opening · A Little Birthday Letter",
  robots: { index: false, follow: false },
};

const demoLetter: BirthdayLetter = {
  recipientName: "Maya",
  senderName: "Jamie",
  birthdayDate: "",
  message: "Happy birthday, Maya!\n\nI hope the year ahead brings you little reasons to smile, big things to look forward to, and plenty of time for the people and places you love. I’m glad I get to celebrate you today.\n\nHere’s to another lovely chapter.",
  memories: [
    "Your laugh making an ordinary afternoon feel like a little celebration.",
    "The way you make room for the people you care about.",
    "All the little adventures still waiting for us.",
  ],
  signoff: "With all my love,",
  tone: "tender",
};

export default function DemoPage() {
  return <RecipientLetter demoLetter={demoLetter} />;
}
