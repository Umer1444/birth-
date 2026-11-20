'use client';

import React from 'react';
import { BirthdayLetter } from '@/types/letter';
import { WaxSeal } from './WaxSeal';
import { MemoryCard } from './MemoryCard';

interface LetterContentProps {
  letter: BirthdayLetter;
  onReplay?: () => void;
  showReplayButton?: boolean;
}

export function LetterContent({
  letter,
  onReplay,
  showReplayButton = false,
}: LetterContentProps) {
  const formattedDate = letter.birthdayDate
    ? new Date(letter.birthdayDate).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <article
      aria-label={`Birthday letter for ${letter.recipientName || 'him'}`}
      className="relative max-w-2xl mx-auto w-full bg-[#fdfbf7] text-[#2d1222] rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 border border-[#eadbca] overflow-hidden"
      style={{
        boxShadow:
          '0 20px 40px -15px rgba(35, 10, 25, 0.45), 0 0 0 1px rgba(212, 175, 55, 0.35)',
      }}
    >
      {/* Delicate vintage paper border lines */}
      <div
        className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl border border-[#d4af37]/35 border-dashed"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-3.5 sm:inset-4.5 rounded-xl border border-[#c59b27]/20"
        aria-hidden="true"
      />

      {/* Subtle corner floral decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 text-[#9b1c36]/20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>

      <header className="relative z-10 flex flex-col items-center text-center pb-6 border-b border-[#ebdccd]">
        <div className="mb-2">
          <WaxSeal initials="✦" size={44} />
        </div>

        {formattedDate && (
          <span className="text-xs uppercase tracking-widest font-sans font-medium text-[#8a5d6a] mb-1">
            {formattedDate}
          </span>
        )}

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#3d1223] tracking-tight mt-1">
          To My Dearest {letter.recipientName || 'Man'}
        </h2>
        <p className="text-xs font-sans text-[#a06877] mt-1 tracking-wide">
          A personal birthday letter written just for him
        </p>
      </header>

      {/* Main Letter Body */}
      <main className="relative z-10 py-8 font-serif text-[16px] sm:text-[18px] leading-[1.85] text-[#2c1320] space-y-4">
        {letter.message
          .split('\n\n')
          .filter(Boolean)
          .map((paragraph, idx) => (
            <p key={idx} className="indent-0">
              {paragraph}
            </p>
          ))}
      </main>

      {/* Optional Shared Memories Section */}
      {letter.memories && letter.memories.length > 0 && (
        <section className="relative z-10 mt-6 pt-6 border-t border-[#ebdccd]" aria-label="Favorite memories with him">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9b1c36]" />
            <h3 className="font-serif text-lg font-semibold text-[#3d1223]">
              Special Moments & Memories with You
            </h3>
          </div>
          <div className="space-y-2">
            {letter.memories.map((mem, index) => (
              <MemoryCard key={mem.id || index} memory={mem} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Sign-off & Signature */}
      <footer className="relative z-10 pt-8 mt-6 border-t border-[#ebdccd] flex flex-col items-end">
        <p className="font-serif italic text-base text-[#6b3546] mb-1">
          {letter.signOff || 'With all my love and devotion,'}
        </p>
        <p className="font-serif text-xl sm:text-2xl font-bold text-[#3d1223] tracking-wide">
          {letter.senderName || 'Your Love'}
        </p>
      </footer>

      {/* Bottom Actions if requested */}
      {showReplayButton && onReplay && (
        <div className="relative z-10 mt-8 pt-4 flex justify-center">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 text-xs font-sans font-medium px-4 py-2 rounded-full bg-[#f4ece1] hover:bg-[#e8d5bc] text-[#522131] border border-[#d8c2a8] transition-colors cursor-pointer"
          >
            <span>↺</span>
            <span>Replay envelope opening</span>
          </button>
        </div>
      )}
    </article>
  );
}
