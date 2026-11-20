"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark, EnvelopeIllustration, HeartIcon } from "@/components/illustrations";
import { RomanticMusic } from "@/components/romantic-music";
import { formatBirthdayDate, type BirthdayLetter } from "@/lib/letter";
import { motionTokens, springs } from "@/lib/motion-tokens";

type RecipientLetterProps = { id?: string; demoLetter?: BirthdayLetter };

export function RecipientLetter({ id, demoLetter }: RecipientLetterProps) {
  const [letter, setLetter] = useState<BirthdayLetter | null>(demoLetter ?? null);
  const [loading, setLoading] = useState(!demoLetter);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [revealedMemories, setRevealedMemories] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (demoLetter) {
      setLetter(demoLetter);
      setLoading(false);
      setError("");
      return;
    }

    if (!id) {
      setError("This letter link does not look right.");
      setLoading(false);
      return;
    }

    let active = true;
    fetch(`/api/letters/${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(typeof payload.error === "string" ? payload.error : "This letter is not available.");
        if (active) setLetter(payload as BirthdayLetter);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "This letter is not available.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id, demoLetter]);

  const duration = reduceMotion ? motionTokens.duration.fast : motionTokens.duration.normal;

  function toggleMemory(index: number) {
    setRevealedMemories((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  }

  function replayEnvelope() {
    setRevealedMemories([]);
    setIsOpen(false);
  }

  return (
    <main className="recipient-page">
      <header className="recipient-header">
        <BrandMark />
        <div className="recipient-header-actions">
          <RomanticMusic />
          <span className="recipient-header-note"><HeartIcon /> {demoLetter ? "a little preview" : "a letter, just for you"}</span>
        </div>
      </header>

      {demoLetter && <div className="demo-ribbon"><span>DEMO LETTER</span> Names and memories are made up. <a href="/">Make your own <span aria-hidden="true">↗</span></a></div>}

      <div className="recipient-content">
        {loading ? (
          <div className="recipient-state" role="status" aria-live="polite">
            <span className="state-star" aria-hidden="true">✳</span>
            <p>Finding your letter…</p>
          </div>
        ) : error || !letter ? (
          <div className="recipient-state error-state" role="alert">
            <div className="state-envelope" aria-hidden="true">✉</div>
            <p className="eyebrow">A LITTLE NOTE FOR YOU</p>
            <h1>This letter is<br /><em>out of reach.</em></h1>
            <p className="recipient-error-copy">{error || "We couldn’t find this letter."}</p>
            <a className="button button-secondary" href="/">Back to the letter maker</a>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.section
                key="opened-letter"
                className="recipient-letter-view"
                initial={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.distance.md, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -motionTokens.distance.sm }}
                transition={{ ...springs.gentle, duration }}
                aria-labelledby="recipient-letter-title"
              >
                <div className="recipient-confetti" aria-hidden="true">
                  <span>✳</span><span>✦</span><span>♡</span><span>✳</span><span>✦</span><span>♡</span>
                </div>
                <div className="recipient-overline"><span>✳</span> A LITTLE BIRTHDAY LETTER <span>✳</span></div>
                <article className="recipient-paper">
                  <div className="recipient-paper-top">
                    <span className="paper-category">TO BE KEPT CLOSE</span>
                    <div className="paper-stamp" aria-hidden="true"><HeartIcon /><small>WITH LOVE</small></div>
                  </div>
                  <div className="paper-rule" />
                  <p className="recipient-date">{letter.birthdayDate ? `For your birthday · ${formatBirthdayDate(letter.birthdayDate)}` : "For your birthday, with love"}</p>
                  <h1 id="recipient-letter-title" className="recipient-title">For {letter.recipientName},<br /><em>with all my heart.</em></h1>
                  <div className="recipient-message">{letter.message}</div>
                  {letter.memories.length > 0 && (
                    <section className="memory-section" aria-labelledby="memory-heading">
                      <div className="memory-heading-row"><span className="memory-sparkle" aria-hidden="true">✳</span><div><h2 id="memory-heading">Little things I love about you</h2><p>Open each tiny note, one by one.</p></div></div>
                      <div className="memory-list">
                        {letter.memories.map((memory, index) => {
                          const revealed = revealedMemories.includes(index);
                          return (
                            <div className={`memory-card ${revealed ? "revealed" : ""}`} key={`${memory}-${index}`}>
                              <button className="memory-card-toggle" type="button" aria-expanded={revealed} aria-controls={`memory-note-${index}`} onClick={() => toggleMemory(index)}>
                                <span className="memory-card-number">0{index + 1}</span>
                                <span className="memory-card-label">{revealed ? "A little note for you" : "A little thing I love"}</span>
                                <span className="memory-card-action">{revealed ? "Tuck it away" : "Open this note"}<span aria-hidden="true">{revealed ? "↺" : "↗"}</span></span>
                              </button>
                              <div className="memory-note-region" id={`memory-note-${index}`} aria-live="polite">
                                <AnimatePresence initial={false}>
                                  {revealed && (
                                    <motion.p
                                      className="memory-note"
                                      key={`memory-note-${index}`}
                                      initial={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.distance.sm }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: reduceMotion ? 0 : -motionTokens.distance.sm }}
                                      transition={{ ...springs.gentle, delay: reduceMotion ? 0 : motionTokens.stagger }}
                                    ><HeartIcon /> {memory}</motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}
                  <div className="recipient-signature">
                    <span>{letter.signoff.trim() || "All my love,"}</span>
                    <strong>{letter.senderName}</strong>
                  </div>
                  <div className="paper-endmark"><span /> <HeartIcon /> <span /></div>
                </article>
                <div className="recipient-bottom-actions">
                  <p><span aria-hidden="true">✦</span> keep this little piece of love close</p>
                  <button className="text-button replay-button" type="button" onClick={replayEnvelope}>Replay the opening <span aria-hidden="true">↺</span></button>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="sealed-envelope"
                className="sealed-letter-view"
                initial={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.distance.md }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -motionTokens.distance.sm }}
                transition={{ ...springs.gentle, duration }}
                aria-labelledby="sealed-title"
              >
                <p className="recipient-overline"><span>✳</span> SOMETHING SPECIAL FOUND ITS WAY TO YOU <span>✳</span></p>
                <h1 id="sealed-title" className="sealed-title">A little note for<br /><em>{letter.recipientName}.</em></h1>
                <p className="sealed-subtitle">Made with love, and meant for your eyes only.</p>
                <button
                  className="envelope-open-button"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("start-romantic-music"));
                    }
                  }}
                  aria-label={`Open the birthday letter for ${letter.recipientName}`}
                >
                  <span className="envelope-art-shell"><EnvelopeIllustration className="envelope-art" /></span>
                  <span className="open-prompt"><span className="open-prompt-label">YOUR LETTER IS READY</span><span className="open-prompt-action">Open your letter <span aria-hidden="true">↗</span></span></span>
                </button>
                <p className="sealed-footer">A birthday wish, sealed with a little love <HeartIcon /></p>
              </motion.section>
            )}
          </AnimatePresence>
        )}
      </div>

      <footer className="recipient-footer"><span>{demoLetter ? "SAMPLE CONTENT · MADE-UP NAMES" : "MADE WITH A LITTLE EXTRA LOVE"}</span><HeartIcon /><span>{demoLetter ? "TRY OPENING THE NOTES" : "AND SENT JUST TO YOU"}</span></footer>
    </main>
  );
}
