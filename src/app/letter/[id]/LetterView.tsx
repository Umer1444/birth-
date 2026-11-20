'use client';

import React from 'react';
import { BirthdayLetter } from '@/types/letter';
import { Envelope } from '@/components/Envelope';
import { AudioPlayer } from '@/components/AudioPlayer';
import Link from 'next/link';

interface LetterViewProps {
  initialLetter: BirthdayLetter | null;
  letterId: string;
}

export function LetterView({ initialLetter, letterId }: LetterViewProps) {
  const [letter, setLetter] = React.useState<BirthdayLetter | null>(initialLetter);
  const [loading, setLoading] = React.useState(!initialLetter);

  React.useEffect(() => {
    if (!initialLetter) {
      // Try fetching from API or local storage fallback
      fetch(`/api/letters/${letterId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.letter) {
            setLetter(data.letter);
          } else {
            // Check localStorage
            try {
              const local = localStorage.getItem(`letter_${letterId}`);
              if (local) {
                setLetter(JSON.parse(local));
              }
            } catch {
              // ignore
            }
          }
        })
        .catch(() => {
          try {
            const local = localStorage.getItem(`letter_${letterId}`);
            if (local) {
              setLetter(JSON.parse(local));
            }
          } catch {
            // ignore
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialLetter, letterId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-[#fae7b5] text-lg">Lighting the candles...</p>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#9b1c36]/20 border border-[#9b1c36]/40 flex items-center justify-center text-2xl mb-4">
          ✉
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fae7b5] mb-2">
          Letter not found
        </h1>
        <p className="max-w-md text-sm text-[#f5dfb8]/80 leading-relaxed mb-6">
          This birthday letter could not be found. It may have expired or the link may be incomplete.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full font-serif font-medium text-sm text-[#2a0e19] bg-gradient-to-r from-[#fae7b5] to-[#e4ba5a] hover:from-[#fff0c8] hover:to-[#ecc46c] transition-all"
        >
          Make a Letter for Him
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-12">
      {/* Floating Header with Melody Player */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕯️</span>
          <span className="font-serif italic text-sm sm:text-base text-[#f5dfb8]/90">
            A Birthday Letter for Him
          </span>
        </div>

        <AudioPlayer />
      </header>

      {/* Main Envelope & Letter Component */}
      <main className="w-full my-auto py-6">
        <Envelope letter={letter} />
      </main>

      {/* Subtle Footer */}
      <footer className="w-full text-center py-6 text-xs font-sans text-[#a06877]">
        Made with love ✦ {letter.senderName || 'Your Love'}
      </footer>
    </div>
  );
}
