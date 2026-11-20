"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon, BrandMark, CopyIcon, HeartIcon, PostcardIllustration } from "@/components/illustrations";
import { RomanticMusic } from "@/components/romantic-music";
import { formatBirthdayDate, starterLetter, type BirthdayLetter, type LetterTone, MAX_LETTER_LENGTH } from "@/lib/letter";
import { motionTokens, springs } from "@/lib/motion-tokens";

const emptyLetter: BirthdayLetter = {
  recipientName: "",
  senderName: "",
  birthdayDate: "",
  message: "",
  memories: ["", "", ""],
  signoff: "",
  tone: "tender",
};

const tones: { value: LetterTone; label: string; note: string }[] = [
  { value: "tender", label: "Tender", note: "soft & sincere" },
  { value: "playful", label: "Playful", note: "light & sunny" },
  { value: "poetic", label: "Poetic", note: "a little lyrical" },
];

export function LetterMaker() {
  const [draft, setDraft] = useState<BirthdayLetter>(emptyLetter);
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [saveError, setSaveError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const reduceMotion = useReducedMotion();

  function update<K extends keyof BirthdayLetter>(key: K, value: BirthdayLetter[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateMemory(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      memories: current.memories.map((memory, currentIndex) => currentIndex === index ? value : memory),
    }));
  }

  async function saveLetter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");
    setShareNote("");
    setIsSaving(true);
    try {
      const response = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, memories: draft.memories.filter((memory) => memory.trim()) }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== "string") {
        throw new Error(typeof result.error === "string" ? result.error : "The letter could not be saved. Please try again.");
      }
      setShareUrl(`${window.location.origin}/letter/${result.id}`);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "The letter could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function copyShareUrl() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setShareNote("Link copied. Send it whenever you’re ready.");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setShareNote("Copy wasn’t available here. Open the letter and copy its address from your browser.");
    }
  }

  async function shareLetter() {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: `A birthday letter for ${draft.recipientName}`, text: "I made a little something for you.", url: shareUrl });
        setShareNote("Your letter is ready to share.");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    await copyShareUrl();
  }

  function resetLetter() {
    setDraft(emptyLetter);
    setShareUrl("");
    setSaveError("");
    setShareNote("");
    setCopied(false);
  }

  const previewMessage = draft.message.trim() || "Your words will find their place here, one honest line at a time.";
  const dateLabel = draft.birthdayDate ? formatBirthdayDate(draft.birthdayDate) : "A birthday just for you";

  return (
    <div className="site-shell">
      <header className="topbar">
        <BrandMark />
        <div className="topbar-note"><span className="topbar-heart"><HeartIcon /></span> a little corner of the internet, made for one person</div>
        <div className="topbar-actions">
          <RomanticMusic />
          <a className="topbar-link" href="#make-your-letter">Make a letter <ArrowIcon /></a>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A birthday keepsake, made by you</p>
            <h1 id="hero-title">Some things deserve<br />a little <em>paper & pause.</em></h1>
            <p className="hero-description">Turn the words you mean into a letter she can keep. Make it yours, wrap it in a tiny bit of magic, and send one special link.</p>
            <div className="hero-actions">
              <a className="button button-primary hero-button" href="#make-your-letter">Make her birthday letter <ArrowIcon /></a>
              <a className="hero-demo-link" href="/demo">Try the envelope opening <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-footnote"><span className="scribble-heart" aria-hidden="true">♡</span> made slowly, with love <span className="footnote-rule" /></div>
          </div>
          <motion.div
            className="hero-art-wrap"
            initial={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.distance.md }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.distance.sm }}
            transition={springs.gentle}
          >
            <span className="hero-art-note note-one">a note for you</span>
            <PostcardIllustration className="hero-art" />
            <span className="hero-art-note note-two">made with care <span aria-hidden="true">✳</span></span>
          </motion.div>
          <span className="hero-side-label" aria-hidden="true">KEEP THIS ONE CLOSE</span>
        </section>

        <div className="page-divider" aria-hidden="true"><span /><HeartIcon /><span /></div>

        <section className="maker-section" id="make-your-letter" aria-labelledby="maker-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-eyebrow">01 <span className="eyebrow-line" /> your words, your way</p>
              <h2 id="maker-title">Put a little <em>you</em> into it.</h2>
            </div>
            <p className="section-aside">No perfect words needed. Just the ones<br className="desktop-break" /> that sound like you.</p>
          </div>

          <div className="maker-layout">
            <div className="form-column">
              {shareUrl ? (
                <div className="saved-panel" aria-live="polite">
                  <span className="saved-kicker"><span className="saved-check">✓</span> YOUR LETTER IS SEALED</span>
                  <h3>A little love,<br /><em>on its way.</em></h3>
                  <p className="saved-copy">Your letter has its own private link. Open it once to make sure it looks just right, then send it to her.</p>
                  <label className="share-label" htmlFor="share-link">Her letter’s link</label>
                  <div className="share-link-box">
                    <input id="share-link" value={shareUrl} readOnly aria-label="Your shareable letter link" />
                    <button className="icon-button" type="button" onClick={copyShareUrl} aria-label={copied ? "Link copied" : "Copy link"}>
                      {copied ? <span aria-hidden="true">✓</span> : <CopyIcon />}
                    </button>
                  </div>
                  <div className="saved-actions">
                    <button className="button button-primary" type="button" onClick={shareLetter}>{navigatorShareLabel()} <ArrowIcon /></button>
                    <a className="button button-secondary" href={shareUrl} target="_blank" rel="noreferrer">Open her letter</a>
                  </div>
                  <p className="share-feedback" role="status">{shareNote || (copied ? "Copied to clipboard." : "Anyone with this link can read the letter.")}</p>
                  <button className="text-button start-over" type="button" onClick={resetLetter}>Make another letter <span aria-hidden="true">↗</span></button>
                </div>
              ) : (
                <form className="letter-form" onSubmit={saveLetter}>
                  <div className="form-block">
                    <div className="form-block-heading"><span className="form-number">01</span><div><h3>Who’s it for?</h3><p>Let the letter know whose day it is.</p></div></div>
                    <div className="field-grid">
                      <label className="field"><span>Her name <b>*</b></span><input autoComplete="off" required maxLength={80} value={draft.recipientName} onChange={(event) => update("recipientName", event.target.value)} placeholder="What you call her" /></label>
                      <label className="field"><span>Your name <b>*</b></span><input autoComplete="off" required maxLength={80} value={draft.senderName} onChange={(event) => update("senderName", event.target.value)} placeholder="From your favorite person" /></label>
                    </div>
                    <label className="field field-date"><span>Her birthday <small>optional</small></span><input type="date" value={draft.birthdayDate} onChange={(event) => update("birthdayDate", event.target.value)} /></label>
                  </div>

                  <div className="form-divider" />

                  <div className="form-block">
                    <div className="form-block-heading"><span className="form-number">02</span><div><h3>Find your feeling.</h3><p>Pick a tone for an editable starter note.</p></div></div>
                    <div className="tone-options" aria-label="Choose a starter letter tone">
                      {tones.map((tone) => (
                        <button
                          type="button"
                          aria-pressed={draft.tone === tone.value}
                          key={tone.value}
                          className={`tone-option ${draft.tone === tone.value ? "selected" : ""}`}
                          onClick={() => update("tone", tone.value)}
                        >
                          <span>{tone.label}</span><small>{tone.note}</small>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-divider" />

                  <div className="form-block">
                    <div className="form-block-heading message-heading"><span className="form-number">03</span><div><h3>Say what you mean.</h3><p>Write from the heart, or let a starter help you begin.</p></div></div>
                    <div className="message-tools">
                      <button className="text-button starter-button" type="button" onClick={() => update("message", starterLetter(draft.tone, draft.recipientName))}>{draft.message ? "Replace with a starter" : "Give me a starting note"} <span aria-hidden="true">✳</span></button>
                      <span className="character-count">{draft.message.length}/{MAX_LETTER_LENGTH}</span>
                    </div>
                    <label className="field field-message"><span className="sr-only">Your birthday letter <b>*</b></span><textarea required maxLength={MAX_LETTER_LENGTH} value={draft.message} onChange={(event) => update("message", event.target.value)} placeholder="A favorite thing about her. Something you’re grateful for. A wish for her next year. Start anywhere…" rows={8} /></label>
                    <p className="field-hint">Line breaks stay in the letter. You can make it as short or as long as you like.</p>
                  </div>

                  <div className="form-divider" />

                  <div className="form-block">
                    <div className="form-block-heading"><span className="form-number">04</span><div><h3>Keep one moment close.</h3><p>Add a detail only the two of you would know. Totally optional.</p></div></div>
                    <div className="memory-fields">
                      {draft.memories.map((memory, index) => (
                        <label className="field memory-field" key={index}>
                          <span><i aria-hidden="true">{index + 1}</i> Little memory <small>optional</small></span>
                          <input maxLength={240} value={memory} onChange={(event) => updateMemory(index, event.target.value)} placeholder={["The day we…", "That time you…", "A little thing I love…"][index]} />
                        </label>
                      ))}
                    </div>
                    <label className="field signoff-field"><span>Sign it <small>optional</small></span><input maxLength={80} value={draft.signoff} onChange={(event) => update("signoff", event.target.value)} placeholder="All my love," /></label>
                  </div>

                  {saveError && <p className="form-error" role="alert">{saveError}</p>}
                  <button className="button button-primary save-button" type="submit" disabled={isSaving}>
                    {isSaving ? "Sealing your letter…" : "Save & make her link"}<ArrowIcon />
                  </button>
                  <p className="save-note"><span aria-hidden="true">✳</span> Your letter is private to anyone who has its link.</p>
                </form>
              )}
            </div>

            <aside className="preview-column" aria-label="Live birthday letter preview">
              <div className="preview-sticky">
                <div className="preview-topline"><span>YOUR LITTLE KEEPSAKE</span><span className="preview-live"><i /> LIVE PREVIEW</span></div>
                <div className="letter-preview">
                  <div className="preview-stamp"><span>FOR YOU</span><HeartIcon /></div>
                  <div className="preview-postmark" aria-hidden="true"><span>WITH LOVE</span><b>✳</b><small>FROM ME TO YOU</small></div>
                  <p className="preview-date">{dateLabel}</p>
                  <h3 className="preview-greeting">Dear {draft.recipientName.trim() || "my favorite person"},</h3>
                  <p className={`preview-message ${draft.message.trim() ? "" : "preview-placeholder"}`}>{previewMessage}</p>
                  {draft.memories.some((memory) => memory.trim()) && (
                    <div className="preview-memories">
                      {draft.memories.filter((memory) => memory.trim()).map((memory, index) => <p key={`${memory}-${index}`}><span aria-hidden="true">♡</span> {memory}</p>)}
                    </div>
                  )}
                  <p className="preview-signoff">{draft.signoff.trim() || "with all my love,"}<br /><span>{draft.senderName.trim() || "your person"}</span></p>
                  <div className="preview-bottom"><span>sealed with a kiss</span><HeartIcon /></div>
                </div>
                <div className="preview-caption"><span>✳</span> A little piece of you, sent across the miles.</div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <BrandMark />
        <p>Good things are worth putting into words.</p>
        <span className="footer-heart"><HeartIcon /></span>
      </footer>
    </div>
  );
}

function navigatorShareLabel() {
  return "Share her letter";
}
