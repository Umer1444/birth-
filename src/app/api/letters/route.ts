import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { MAX_LETTER_LENGTH, type BirthdayLetter, type LetterTone } from "@/lib/letter";

export const runtime = "nodejs";

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function parseLetter(body: unknown): BirthdayLetter | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  const recipientName = cleanString(input.recipientName, 80);
  const senderName = cleanString(input.senderName, 80);
  const birthdayDate = cleanString(input.birthdayDate, 10);
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const signoff = cleanString(input.signoff, 80);
  const tone = input.tone;
  const rawMemories = Array.isArray(input.memories) ? input.memories : [];
  const memories = rawMemories
    .slice(0, 3)
    .map((value) => cleanString(value, 240))
    .filter(Boolean);

  if (
    !recipientName ||
    !senderName ||
    !message ||
    message.length > MAX_LETTER_LENGTH ||
    (birthdayDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthdayDate)) ||
    !["tender", "playful", "poetic"].includes(String(tone))
  ) {
    return null;
  }

  return {
    recipientName,
    senderName,
    birthdayDate,
    message,
    memories,
    signoff,
    tone: tone as LetterTone,
  };
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return Response.json(
      { error: "Share links need Supabase setup. Add the server settings from the setup guide and try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The letter details could not be read." }, { status: 400 });
  }

  const payload = parseLetter(body);
  if (!payload) {
    return Response.json(
      { error: "Add both names and a letter, then check the date and try again." },
      { status: 400 },
    );
  }

  const id = randomBytes(18).toString("base64url");
  const { error } = await supabase.from("birthday_letters").insert({ id, payload });
  if (error) {
    return Response.json(
      { error: "Your letter could not be saved just now. Please try again in a moment." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json({ id }, { headers: { "Cache-Control": "no-store" } });
}
