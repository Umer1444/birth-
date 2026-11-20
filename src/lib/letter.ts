export type LetterTone = "tender" | "playful" | "poetic";

export type BirthdayLetter = {
  recipientName: string;
  senderName: string;
  birthdayDate: string;
  message: string;
  memories: string[];
  signoff: string;
  tone: LetterTone;
};

export const MAX_LETTER_LENGTH = 7000;

export function greetingFor(name: string) {
  const cleanName = name.trim();
  return cleanName ? `Happy birthday, ${cleanName}!` : "Happy birthday, my love!";
}

export function starterLetter(tone: LetterTone, name: string) {
  const greeting = greetingFor(name);
  const notes: Record<LetterTone, string> = {
    tender:
      "I hope today gives a little of the warmth and happiness you bring into my life. I feel lucky to love you, and I’m looking forward to all the ordinary little moments and big adventures still waiting for us.",
    playful:
      "Today, the universe has excellent taste: it’s celebrating you. I hope your day is full of your favorite things, extra dessert, and absolutely no boring plans. I’m very glad I get to be on your team.",
    poetic:
      "Another year of you feels like a new page I can’t wait to read beside you. May this next chapter bring soft mornings, bright surprises, and all the beautiful things your heart has been making room for.",
  };
  return `${greeting}\n\n${notes[tone]}\n\nI love you.`;
}

export function formatBirthdayDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
