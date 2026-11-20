"use client";

import { useEffect, useRef, useState } from "react";

const START_TIME = 18;

export function RomanticMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const handleLoadedMetadata = () => {
      if (audio.currentTime < START_TIME) {
        audio.currentTime = START_TIME;
      }
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      audio.currentTime = START_TIME;
      audio.play().catch(() => setPlaying(false));
    };

    const handleStartEvent = () => {
      if (audio.paused) {
        if (audio.currentTime < START_TIME) {
          audio.currentTime = START_TIME;
        }
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    window.addEventListener("start-romantic-music", handleStartEvent);

    if (audio.readyState >= 1 && audio.currentTime < START_TIME) {
      audio.currentTime = START_TIME;
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("start-romantic-music", handleStartEvent);
    };
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      if (audio.currentTime < START_TIME) {
        audio.currentTime = START_TIME;
      }
      audio.play().catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="auto"
        playsInline
      />
      <button
        className={`music-toggle ${playing ? "is-playing" : ""}`}
        type="button"
        aria-label={playing ? "Pause the romantic song" : "Play the romantic song"}
        aria-pressed={playing}
        onClick={toggleMusic}
      >
        <span className="music-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 10v4h3l4 3V7l-4 3H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            {playing ? (
              <>
                <path d="M15 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <path d="m15 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </span>
        <span className="music-toggle-label">{playing ? "Pause melody" : "Play melody"}</span>
        <span className="music-toggle-dot" aria-hidden="true" />
      </button>
    </>
  );
}
