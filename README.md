# A Little Birthday Letter

A responsive birthday-letter maker with a candlelit plum backdrop, original rose illustrations, Fraunces display type, Lora letter text, and warm ivory stationery. A small play control starts an original, soft looping melody only when tapped; the recipient page opens like a keepsake envelope, with optional personal notes as tap-to-reveal keepsakes. The visual mood takes inspiration from the rose-lit atmosphere of [2luv](https://2-luv.com/), with a distinct layout and original artwork.

Open `/demo` to preview the sealed-envelope opening and tap-to-reveal notes without setting up a database. The demo is labeled and uses fictional names and messages.

## Local setup

1. Install Node.js 20.9 or newer.
2. Install dependencies with `npm install`.
3. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor.
4. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project. Keep the service-role key private; it is only used in server routes.
5. Start the app with `npm run dev` and open `http://localhost:3000`.

The creator form and preview work without Supabase. Saving a shareable letter requires the two Supabase values; the site will show a setup message instead of producing a fake link when they are missing.

## Deploy

Deploy this repository to Vercel. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as server-side environment variables for the Production environment, then deploy. Run the schema SQL once in Supabase before sharing links. Recipient pages are unlisted and marked `noindex`; anyone with a letter URL can read that letter.

## Share link behavior

Each letter is assigned a cryptographically random identifier and stored as one row in `public.birthday_letters`. The only public access path is the app's server route for that exact identifier. There is no list/search endpoint, and letter contents are not logged.
