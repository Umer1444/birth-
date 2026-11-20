'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  className?: string;
}

export function AudioPlayer({ className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      // Try fallback to /song.mp3 or /vaaroon-forever.mp3
      if (audio.src.includes('song.mp3')) {
        audio.src = '/vaaroon-forever.mp3';
        audio.load();
      } else {
        setHasError(true);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setHasError(true);
      });
    }
  };

  if (hasError) return null;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#2a101f]/75 backdrop-blur-md border border-[#e8b4b8]/30 text-[#fcf8f2] shadow-lg text-xs ${className}`}
    >
      <audio ref={audioRef} src="/song.mp3" preload="metadata" loop />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#d4af37]/20 hover:bg-[#d4af37]/35 text-[#f6d06f] transition-all cursor-pointer"
      >
        {isPlaying ? (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        )}
      </button>

      <span className="font-sans font-medium tracking-wide text-[#f5dfb8]/90 select-none">
        {isPlaying ? 'Playing melody ♪' : 'Play melody'}
      </span>

      {isPlaying && (
        <span className="flex items-center gap-0.5">
          <span className="w-1 h-3 bg-[#f6d06f] rounded-full animate-pulse" />
          <span className="w-1 h-2 bg-[#f6d06f] rounded-full animate-pulse delay-75" />
          <span className="w-1 h-4 bg-[#f6d06f] rounded-full animate-pulse delay-150" />
        </span>
      )}
    </div>
  );
}
