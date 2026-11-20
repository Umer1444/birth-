import { NextRequest, NextResponse } from 'next/server';
import { getLetterById } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Letter ID is required' }, { status: 400 });
    }

    const letter = await getLetterById(id);

    if (!letter) {
      return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
    }

    return NextResponse.json({ letter });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
