export interface MemoryItem {
  id: string;
  title: string;
  content: string;
}

export type LetterTone = 'tender' | 'playful' | 'poetic';

export interface BirthdayLetter {
  id: string;
  recipientName: string; // His name
  senderName: string; // Your name
  birthdayDate?: string;
  tone: LetterTone;
  message: string;
  signOff?: string;
  memories: MemoryItem[];
  createdAt: string;
}
