import { createClient } from '@supabase/supabase-js';
import { BirthdayLetter } from '@/types/letter';

// Global memory cache for letters so the app runs smoothly even if Supabase env vars aren't configured yet
declare global {
  // eslint-disable-next-line no-var
  var __LETTER_CACHE: Map<string, BirthdayLetter> | undefined;
}

const memoryStore = globalThis.__LETTER_CACHE ?? new Map<string, BirthdayLetter>();
if (!globalThis.__LETTER_CACHE) {
  globalThis.__LETTER_CACHE = memoryStore;
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    return createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return null;
}

export async function saveLetter(letter: BirthdayLetter): Promise<{ success: boolean; error?: string }> {
  // Always keep in memory store
  memoryStore.set(letter.id, letter);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // If Supabase is not configured, we persist in memory cache
    return { success: true };
  }

  try {
    const { error } = await supabase.from('birthday_letters').insert({
      id: letter.id,
      payload: letter,
      created_at: letter.createdAt || new Date().toISOString(),
    });

    if (error) {
      console.warn('Supabase insert warning, letter stored in memory:', error.message);
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown storage error';
    console.warn('Failed to insert into Supabase, letter retained in memory:', message);
    return { success: true };
  }
}

export async function getLetterById(id: string): Promise<BirthdayLetter | null> {
  // 1. Try Supabase if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_letters')
        .select('payload')
        .eq('id', id)
        .single();

      if (!error && data?.payload) {
        return data.payload as BirthdayLetter;
      }
    } catch (err) {
      console.warn('Supabase fetch error, checking memory cache:', err);
    }
  }

  // 2. Check memory store
  if (memoryStore.has(id)) {
    return memoryStore.get(id) || null;
  }

  return null;
}
