'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem } from '@/types/letter';
import { WaxSeal } from './WaxSeal';

interface MemoryCardProps {
  memory: MemoryItem;
  index: number;
}

export function MemoryCard({ memory, index }: MemoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-3">
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-xl border p-4 select-none ${
          isOpen
            ? 'bg-[#fffaf0] border-[#d4af37]/60 shadow-md ring-1 ring-[#d4af37]/30'
            : 'bg-[#fcf8f2] border-[#e8d5bc] hover:border-[#c59b27] shadow-sm hover:shadow'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <WaxSeal initials={`${index + 1}`} size={32} />
            </div>
            <div>
              <p className="text-[11px] font-sans font-semibold tracking-wider text-[#9b1c36] uppercase">
                A Favorite Memory with You #{index + 1}
              </p>
              <h4 className="font-serif text-base font-semibold text-[#3b1220] leading-snug">
                {memory.title || `Memory #${index + 1}`}
              </h4>
            </div>
          </div>

          <span className="text-xs font-sans text-[#8a5d6a] px-2.5 py-1 rounded-full bg-[#f4ece1] border border-[#e4d3bd] shrink-0 font-medium">
            {isOpen ? 'Fold note ↑' : 'Open note ✦'}
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pt-2 border-t border-[#e8d5bc]/70 text-sm font-serif leading-relaxed text-[#4a242f]"
            >
              <p className="whitespace-pre-line italic">
                &ldquo;{memory.content}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
