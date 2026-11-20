'use client';

import React, { useState } from 'react';
import { BirthdayLetter, LetterTone, MemoryItem } from '@/types/letter';
import { STARTER_TEMPLATES } from '@/lib/starterTemplates';
import { LetterContent } from '@/components/LetterContent';
import { WaxSeal } from '@/components/WaxSeal';
import { AudioPlayer } from '@/components/AudioPlayer';

export default function Home() {
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [tone, setTone] = useState<LetterTone>('tender');
  const [message, setMessage] = useState(STARTER_TEMPLATES.tender.message);
  const [signOff, setSignOff] = useState(STARTER_TEMPLATES.tender.signOff);
  const [memories, setMemories] = useState<MemoryItem[]>(
    STARTER_TEMPLATES.tender.suggestedMemories
  );

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const applyTemplate = (selectedTone: LetterTone) => {
    setTone(selectedTone);
    const tmpl = STARTER_TEMPLATES[selectedTone];
    setMessage(tmpl.message);
    setSignOff(tmpl.signOff);
    setMemories(tmpl.suggestedMemories);
  };

  const handleAddMemory = () => {
    if (memories.length >= 3) return;
    setMemories([
      ...memories,
      {
        id: `mem-${Date.now()}`,
        title: '',
        content: '',
      },
    ]);
  };

  const handleUpdateMemory = (
    index: number,
    field: 'title' | 'content',
    value: string
  ) => {
    const updated = [...memories];
    updated[index] = { ...updated[index], [field]: value };
    setMemories(updated);
  };

  const handleRemoveMemory = (index: number) => {
    setMemories(memories.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setErrorMessage("Please enter his name before creating the letter.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please write a message for him.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const letterData = {
      recipientName: recipientName.trim(),
      senderName: senderName.trim() || 'Your Love',
      birthdayDate: birthdayDate || undefined,
      tone,
      message: message.trim(),
      signOff: signOff.trim(),
      memories: memories.filter((m) => m.title.trim() || m.content.trim()),
    };

    try {
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(letterData),
      });

      const data = await res.json();

      if (!res.ok || !data.id) {
        throw new Error(data.error || 'Failed to save letter');
      }

      const letterId = data.id;
      // Also cache in localStorage for instant retrieval
      try {
        localStorage.setItem(`letter_${letterId}`, JSON.stringify(data.letter));
      } catch {
        // ignore
      }

      const fullUrl = `${window.location.origin}/letter/${letterId}`;
      setSavedUrl(fullUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating letter';
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    if (!savedUrl) return;
    navigator.clipboard.writeText(savedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Preview object
  const currentLetter: BirthdayLetter = {
    id: 'preview',
    recipientName: recipientName || 'Him',
    senderName: senderName || 'Your Love',
    birthdayDate,
    tone,
    message: message || 'Your heartfelt letter will appear here...',
    signOff,
    memories: memories.filter((m) => m.title || m.content),
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header bar */}
      <header className="max-w-4xl mx-auto flex items-center justify-between pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9b1c36]/25 border border-[#9b1c36]/40 flex items-center justify-center text-xl">
            🕯️
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#fae7b5]">
              Candlelit Letters
            </h1>
            <p className="text-xs font-sans text-[#cf9fa8]">
              Handcrafted Birthday Letter for Him
            </p>
          </div>
        </div>

        <AudioPlayer />
      </header>

      {/* Hero Welcome banner */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d1123] border border-[#e8b4b8]/20 text-[#f5dfb8] text-xs font-medium mb-3">
          <span>✦</span>
          <span>A Romantic Keepsake for Your Boyfriend or Special Man</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fcf8f2] tracking-tight leading-tight mb-4">
          Make His Birthday Letter
        </h2>
        <p className="text-sm sm:text-base text-[#d9aab3] max-w-xl mx-auto leading-relaxed">
          Write a meaningful letter for him by candlelight. When he opens his unique link, he will experience a sealed vintage envelope opening, soft music, and your cherished memories together.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex p-1 rounded-xl bg-[#230c1d] border border-[#e8b4b8]/20">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
              activeTab === 'edit'
                ? 'bg-[#9b1c36] text-[#fffdfa] shadow'
                : 'text-[#d9aab3] hover:text-[#fffdfa]'
            }`}
          >
            ✏️ Write His Letter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-[#9b1c36] text-[#fffdfa] shadow'
                : 'text-[#d9aab3] hover:text-[#fffdfa]'
            }`}
          >
            👁️ Live Keepsake Preview
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto">
        {activeTab === 'preview' ? (
          <div className="space-y-6">
            <div className="text-center text-xs text-[#eed8b0]/80">
              This is how your personalized letter will look once he breaks the wax seal:
            </div>
            <LetterContent letter={currentLetter} />
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className="px-6 py-2.5 rounded-full font-sans text-sm font-medium bg-[#2d1123] border border-[#d4af37]/40 text-[#fae7b5] hover:bg-[#3d162f] transition-colors"
              >
                ← Back to Editing
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            className="bg-[#1f0b1a]/80 backdrop-blur-md border border-[#e8b4b8]/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Tone selector with quick inspiration */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-serif font-semibold text-[#fae7b5]">
                  Select a Romantic Tone for Him
                </label>
                <span className="text-xs text-[#cf9fa8]">
                  Click to fill starter inspiration
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(STARTER_TEMPLATES) as LetterTone[]).map((t) => {
                  const tmpl = STARTER_TEMPLATES[t];
                  const isSelected = tone === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => applyTemplate(t)}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#9b1c36]/30 border-[#d4af37] ring-1 ring-[#d4af37]/40 text-[#fffdf9]'
                          : 'bg-[#150612]/60 border-[#e8b4b8]/20 text-[#d9aab3] hover:border-[#e8b4b8]/40'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#fae7b5]">
                        {tmpl.label}
                      </div>
                      <div className="text-xs text-[#eed8b0]/70 mt-1 line-clamp-2">
                        {tmpl.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Names & Birthday Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#fae7b5] mb-1.5"
                >
                  His Name <span className="text-[#f43f5e]">*</span>
                </label>
                <input
                  id="recipientName"
                  type="text"
                  required
                  placeholder="e.g. Liam, Alex, My Love..."
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#140611] border border-[#e8b4b8]/30 text-[#fffdfa] placeholder-[#7d4855] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="senderName"
                  className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#fae7b5] mb-1.5"
                >
                  Your Name / Signature
                </label>
                <input
                  id="senderName"
                  type="text"
                  placeholder="e.g. Maya, Yours Always..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#140611] border border-[#e8b4b8]/30 text-[#fffdfa] placeholder-[#7d4855] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="birthdayDate"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#fae7b5] mb-1.5"
              >
                His Birthday Date (Optional)
              </label>
              <input
                id="birthdayDate"
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-[#140611] border border-[#e8b4b8]/30 text-[#fffdfa] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            {/* Letter Body Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="letterMessage"
                  className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#fae7b5]"
                >
                  Your Letter to Him <span className="text-[#f43f5e]">*</span>
                </label>
                <span className="text-xs text-[#cf9fa8]">
                  {message.length} characters
                </span>
              </div>
              <p className="text-xs text-[#cf9fa8] mb-2">
                Personalize every word. Feel free to edit the paragraphs below or write your own heartfelt message.
              </p>
              <textarea
                id="letterMessage"
                rows={9}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your personal birthday message for him..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#140611] border border-[#e8b4b8]/30 text-[#fffdfa] font-serif leading-relaxed text-base focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            {/* Sign-off */}
            <div>
              <label
                htmlFor="signOff"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#fae7b5] mb-1.5"
              >
                Sign-off Phrase
              </label>
              <input
                id="signOff"
                type="text"
                placeholder="e.g. Forever and always yours,"
                value={signOff}
                onChange={(e) => setSignOff(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#140611] border border-[#e8b4b8]/30 text-[#fffdfa] placeholder-[#7d4855] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            {/* Favorite Memories with Him */}
            <div className="pt-4 border-t border-[#e8b4b8]/20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#fae7b5]">
                    Cherished Moments with Him (Optional)
                  </h3>
                  <p className="text-xs text-[#cf9fa8]">
                    Add up to 3 interactive notes he can tap to unfold one at a time.
                  </p>
                </div>

                {memories.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddMemory}
                    className="text-xs font-sans font-semibold px-3 py-1.5 rounded-full bg-[#9b1c36]/30 border border-[#d4af37]/40 text-[#fae7b5] hover:bg-[#9b1c36]/50 transition-colors"
                  >
                    + Add Moment
                  </button>
                )}
              </div>

              <div className="space-y-4 mt-4">
                {memories.map((mem, index) => (
                  <div
                    key={mem.id || index}
                    className="p-4 rounded-2xl bg-[#140611]/80 border border-[#e8b4b8]/20 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans font-semibold uppercase text-[#d4af37]">
                        Memory #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMemory(index)}
                        className="text-xs text-[#f43f5e] hover:text-[#fb7185] transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Title of this memory (e.g. Our late drive together)"
                      value={mem.title}
                      onChange={(e) =>
                        handleUpdateMemory(index, 'title', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0e040c] border border-[#e8b4b8]/20 text-sm text-[#fffdfa] focus:outline-none focus:border-[#d4af37]"
                    />

                    <textarea
                      rows={2}
                      placeholder="What happened and why you cherish it..."
                      value={mem.content}
                      onChange={(e) =>
                        handleUpdateMemory(index, 'content', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0e040c] border border-[#e8b4b8]/20 text-sm text-[#fffdfa] font-serif focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#4a121d] border border-[#f43f5e]/40 text-sm text-[#ffcbd4]">
                {errorMessage}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-serif text-sm font-semibold text-[#f5dfb8] bg-[#2a0e1f] border border-[#e8b4b8]/30 hover:bg-[#3a152d] transition-colors"
              >
                Preview Letter
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-serif font-bold text-base text-[#2a0e19] bg-gradient-to-r from-[#fae7b5] via-[#f7d78a] to-[#e4ba5a] hover:from-[#fff0c8] hover:to-[#ecc46c] shadow-[0_10px_25px_-5px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#2a0e19] border-t-transparent rounded-full animate-spin" />
                    <span>Sealing Letter...</span>
                  </>
                ) : (
                  <>
                    <span>Seal &amp; Create His Link</span>
                    <span>✉</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Modal / Saved Link Notification */}
        {savedUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-[#1e0a19] border border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#9b1c36]/30 border border-[#d4af37]/50 flex items-center justify-center">
                <WaxSeal initials="♥" size={48} />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#fae7b5]">
                His Birthday Letter is Sealed!
              </h3>

              <p className="text-xs text-[#eed8b0]/90 leading-relaxed">
                Share this private link with him. When he opens it, he will receive your candlelit envelope and heartfelt letter.
              </p>

              <div className="p-3 rounded-xl bg-[#12050f] border border-[#e8b4b8]/20 flex items-center justify-between gap-2 text-xs">
                <span className="truncate font-mono text-[#fae7b5] text-left">
                  {savedUrl}
                </span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-[#9b1c36] text-[#fffdfa] font-medium hover:bg-[#b82241] shrink-0 transition-colors"
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={savedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#fae7b5] to-[#e4ba5a] text-[#2a0e19] font-serif font-bold text-sm hover:from-[#fff0c8] hover:to-[#ecc46c] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Recipient View</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSavedUrl(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#2a0e1f] text-[#d9aab3] text-sm hover:text-[#fffdfa] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
