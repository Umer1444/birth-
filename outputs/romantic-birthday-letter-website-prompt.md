# Prompt: build a romantic birthday letter website

Copy the prompt below into your coding assistant. Replace the bracketed details if you want; they can also stay editable in the website.

```text
You are a senior creative frontend engineer and product designer. Build a complete, polished, responsive birthday-letter website from scratch for me to personalize for my girlfriend and share with her as one link. This must be a working website, not a static mockup or a design description.

## What the site does

I use the site to make a birthday letter for my girlfriend. I enter her name, my name, birthday date, a personal message, and optional shared memories. I preview it, save it, and get a unique URL. When she opens that URL on a phone, tablet, or desktop, she sees a small, delightful envelope-opening moment and then her personal birthday letter. She should not need an account or app.

Use editable placeholders such as [HER NAME], [YOUR NAME], [BIRTHDAY DATE], and [A PERSONAL MEMORY]. Never invent personal history or put fake names, dates, or memories into the final letter.

## Start by understanding the project

Inspect the existing repository and follow its conventions. If it is empty, create a clean app using Next.js App Router, TypeScript, and Tailwind CSS. Implement the whole user flow, including the form, live preview, persistence, share page, and setup documentation. Keep the components small and maintainable. Do not leave TODOs, dead buttons, placeholder links, or a fake “link created” success state.

## Art direction

Create a romantic, intimate “birthday letter by candlelight” mood. The first impression should feel like a quiet rose garden at dusk: deep plum and merlot shadows, warm candle glow, dusty blush florals, and little touches of champagne gold. Keep the atmosphere soft and cinematic, while making the letter itself feel like a bright, cherished keepsake. It should feel personal, warm, a little playful, and clearly made for one person. Avoid a generic SaaS dashboard, a template marketplace look, an overly sugary wall of pink hearts, and anything that resembles a newspaper.

Use a restrained palette: candlelit plum and merlot for the surrounding scene; warm ivory for the letter and envelope; dusty rose and muted botanical green for original florals; champagne gold for light and small accents. Add soft out-of-focus glows, a few hand-drawn rose branches, candlelight, tiny stars, and a wax-seal motif. Keep the stationery surfaces clean and unruled, with only subtle paper texture and a delicate border. Keep generous breathing room and make the personal letter the visual focus. Use Fraunces for expressive display text, Lora for the letter itself, DM Sans for controls, and a handwriting accent only for a few small details. Give letter paragraphs relaxed, readable line spacing and keep all body copy easy to read.

Use these Pinterest references for mood and visual research; take the cues, do not copy an existing design or artwork:
- Pinterest 2026 “Pen Pals” trend: handmade correspondence, expressive stationery, postage and stamps: https://business.pinterest.com/pdf/2026-marketing-moments-guide/
- Pinterest romantic / Valentine design guide: playful retro love-letter typography and confident color: https://guide.pinterest.com/design/valentines-day-trends-2025/
- Pinterest birthday card design guide: one clear visual idea, readable type, and a personal message: https://guide.pinterest.com/diy-and-crafts/designing-a-birthday-card/
- Pinterest search for handmade love-letter stationery and romantic paper ephemera: https://www.pinterest.com/search/pins/?q=handmade%20love%20letter%20stationery%20romantic%20paper%20ephemera
- 2luv’s digital love-letter experience: https://2-luv.com/ — take cues from its candlelit rose atmosphere, gift-like envelope opening, and idea of revealing personal moments one at a time. Create a distinct layout, copy, and original illustrations; do not reproduce 2luv’s artwork or page composition.

## Original art assets

I do not have romantic photos, SVGs, or illustrations. Create the visual assets as original inline SVGs and CSS: an envelope, a small stamp, wax seal, tiny hearts, botanical sprigs, sparkles, and paper texture. Make the artwork crisp and responsive. Do not use random stock photos, scrape Pinterest images, or depend on an asset I have not supplied. Decorative SVGs should be hidden from screen readers; meaningful graphics need accessible labels.

## Pages and interactions

1. `/` — a welcoming maker page with one clear action, “Make her birthday letter.” Show a small stationery illustration and a brief, sincere introduction.
2. The creator flow — a focused, mobile-friendly form with:
   - her name, my name, and birthday date (optional if I do not want a date shown);
   - an editable letter textarea;
   - an optional “one of my favorite memories” section with up to three short entries;
   - a tone choice such as tender, playful, or poetic, used only when drafting starter copy;
   - an optional sign-off.
   Include helpful starter prompts, character guidance, validation, and a live preview. Let me edit every generated sentence before saving. Do not call a paid AI API; provide simple local starter-copy templates if a “help me write” action is included.
3. A preview that resembles a keepsake card and lets me check the letter on narrow and wide layouts before saving.
4. A save step that creates a durable, unique, hard-to-guess share URL, displays it clearly, and provides working Copy link and Share actions. After saving, let me open the recipient view in a new tab. Show a useful recovery message if saving fails.
5. `/letter/[id]` — the recipient page. Start with a sealed envelope and a clear “Open your letter” button. On tap/click, animate the envelope opening and reveal the letter. Present the personalized message on a paper-like surface with a signature, date when provided, and optional memories. Present each optional memory as its own tap-to-reveal note so she can open the moments one at a time. Include a small birthday flourish after the letter appears, with a visible “Replay” action. The letter must remain readable and usable if animation is disabled.
6. Add a thoughtful not-found state for an invalid or unavailable link.

## Share links and data

A shared URL must work on her device after I close my browser. Persist saved letters in Supabase using a server-only connection, or use the repository’s existing secure persistence layer if it already has one. Generate a cryptographically random, unguessable public ID for each letter. Store only the fields needed to render the letter. Keep service-role credentials on the server; never expose secrets in browser code. Do not create a public listing or search endpoint. Mark recipient pages `noindex`. Add `.env.example`, the database schema/setup SQL, and clear steps for local setup and deployment (for example, Vercel plus Supabase). If credentials are absent, make the configuration requirement obvious and do not pretend a durable link was saved. Avoid logging letter contents.

## Motion

Use Motion for React from `motion/react` (the `motion` package), not imports from `framer-motion`. Create shared motion tokens and spring presets first, then use them consistently. Animate only meaningful moments: a gentle envelope open, the letter reveal, restrained entrance of a few details, and clear button feedback. Use transform and opacity, keep motion lightweight, and avoid constant floating hearts or animation that delays reading. Use `AnimatePresence` with keyed children and exit states for conditional content. Respect `prefers-reduced-motion`: remove movement and keep any remaining fade at 200 ms or less. Make initial animation state safe for server rendering and hydration.

## Music

Add a small, accessible play/pause control for an original gentle romantic melody. Do not autoplay: start audio only after a user taps the control, keep the volume soft, and let the recipient pause it at any time. Prefer a lightweight original browser-generated melody or a properly licensed local asset; do not hotlink an arbitrary song.

## Responsive, accessible, and robust

Design mobile first and support small phones around 360 px wide through large desktop screens. No horizontal overflow. Keep form controls comfortable to tap, labels visible, text readable, and the main action obvious. Support keyboard use, visible focus, semantic headings, screen readers, and sufficient contrast. Do not rely on hover for essential actions. Respect reduced motion and provide non-animated access to the complete letter. Validate input, render user-provided text safely, and handle loading, save errors, missing letters, and success states with clear next steps.

## Finish and handoff

Build the actual experience, then give me:
- a short summary of the implemented flow;
- the exact commands to run it locally;
- the Supabase and hosting setup steps, including required environment variable names;
- the production URL only if it has really been deployed and opened successfully.

If deployment credentials or access are not available, finish the deploy-ready app and give me the exact deployment steps. Do not claim the site is live or that a share link works until it has been saved and verified against the configured persistence service.
```

## Why this prompt is structured this way

It applies ECC’s frontend design direction to define the audience, visual tone, memorable stationery details, target screens, and usable states. It applies ECC’s motion foundations and patterns to keep the envelope interaction purposeful, responsive, and accessible. The Pinterest links point to Pinterest’s letter-writing, romantic typography, and birthday-card design references. The 2luv reference adds the gift-like envelope opening and sequential reveal of personal moments.
