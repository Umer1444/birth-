'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayLetter } from '@/types/letter';
import { WaxSeal } from './WaxSeal';
import { LetterContent } from './LetterContent';
import { springPresets } from '@/lib/motion';

interface EnvelopeProps {
  letter: BirthdayLetter;
}

export function Envelope({ letter }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFlourish, setShowFlourish] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowFlourish(true);
    }, 600);
  };

  const handleReplay = () => {
    setShowFlourish(false);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Gentle floating birthday stardust / rose petal flourish */}
      {showFlourish && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: -30,
                x: `${Math.random() * 100}vw`,
                scale: 0.5 + Math.random() * 0.8,
                rotate: Math.random() * 360,
              }}
              animate={{
                opacity: [0, 0.9, 0.7, 0],
                y: '105vh',
                rotate: 360 + Math.random() * 360,
              }}
              transition={{
                duration: 4.5 + Math.random() * 3,
                ease: 'easeOut',
                delay: Math.random() * 1.5,
              }}
              className="absolute text-lg select-none"
            >
              {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🌸' : '⭐'}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed-envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={springPresets.gentle}
            className="w-full flex flex-col items-center"
          >
            {/* The Envelope Body */}
            <div
              className="relative w-full max-w-lg aspect-[1.45/1] rounded-2xl bg-gradient-to-b from-[#fdfaf5] via-[#f7f0e4] to-[#ede2d1] border-2 border-[#d9c4aa] shadow-[0_25px_50px_-12px_rgba(25,5,15,0.6),0_0_0_1px_rgba(212,175,55,0.4)] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Envelope flap creases background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.7) 0%, rgba(230,215,195,0.2) 60%)',
                }}
              />

              {/* Top envelope triangle flap */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none border-b border-[#d8c2a7]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #fbf7ee 0%, #ede0cf 100%)',
                  boxShadow: '0 4px 12px rgba(45, 15, 25, 0.12)',
                }}
              />

              {/* Postage Stamp */}
              <div className="relative z-10 self-end">
                <div className="w-16 h-20 sm:w-20 sm:h-24 p-1.5 rounded-sm bg-[#fffdf9] border-2 border-dashed border-[#b3495d] shadow-sm flex flex-col items-center justify-between rotate-2">
                  <div className="w-full flex justify-between text-[8px] font-sans font-bold text-[#9b1c36] uppercase tracking-tighter">
                    <span>LOVE POST</span>
                    <span>2026</span>
                  </div>
                  <div className="text-xl sm:text-2xl">🌹</div>
                  <div className="text-[9px] font-serif font-bold text-[#5e1927]">
                    FOR HIM
                  </div>
                </div>
              </div>

              {/* Calligraphy Addressed to Him */}
              <div className="relative z-10 self-center text-center my-auto py-2">
                <span className="text-xs uppercase tracking-widest font-sans font-medium text-[#7d4855]">
                  Personal Delivery
                </span>
                <h3 className="font-serif italic text-2xl sm:text-4xl text-[#3d1223] font-bold mt-1 tracking-wide">
                  For {letter.recipientName || 'Him'}
                </h3>
                <p className="text-[11px] font-sans text-[#966371] mt-0.5">
                  A Birthday Letter Sealed with Love
                </p>
              </div>

              {/* Wax Seal placed over flap intersection */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <WaxSeal
                  initials="♥"
                  size={76}
                  interactive
                  onClick={handleOpen}
                />
              </div>

              {/* Bottom decorative bar */}
              <div className="relative z-10 text-center text-[10px] font-sans text-[#8e606d] tracking-wider uppercase">
                Handmade Stationery ✦ Open by Candlelight
              </div>
            </div>

            {/* Clear Call to Action Button */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleOpen}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-serif font-semibold text-lg text-[#2a0e19] bg-gradient-to-r from-[#fae7b5] via-[#f7d78a] to-[#e4ba5a] hover:from-[#fff0c8] hover:to-[#ecc46c] shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Break Seal &amp; Open Letter</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">
                  ✉
                </span>
              </button>
              <span className="text-xs text-[#eed8b0]/70 font-sans tracking-wide">
                Tap the wax seal or button to open his letter
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-letter"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={springPresets.letterSlide}
            className="w-full"
          >
            <LetterContent
              letter={letter}
              showReplayButton
              onReplay={handleReplay}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
