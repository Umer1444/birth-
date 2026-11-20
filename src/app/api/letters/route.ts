import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { BirthdayLetter } from '@/types/letter';
import { saveLetter } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientName,
      senderName,
      birthdayDate,
      tone = 'tender',
      message,
      signOff,
      memories = [],
    } = body;

    if (!recipientName || !message) {
      return NextResponse.json(
        { error: 'His name and a personal message are required.' },
        { status: 400 }
      );
    }

    // Generate cryptographically random, unguessable public ID
    const randomHex = crypto.randomBytes(8).toString('hex');
    const id = `letter_${randomHex}`;

    const newLetter: BirthdayLetter = {
      id,
      recipientName: recipientName.trim(),
      senderName: (senderName || 'Your Love').trim(),
      birthdayDate: birthdayDate || undefined,
      tone: tone || 'tender',
      message: message.trim(),
      signOff: signOff ? signOff.trim() : undefined,
      memories: Array.isArray(memories) ? memories : [],
      createdAt: new Date().toISOString(),
    };

    await saveLetter(newLetter);

    return NextResponse.json({
      success: true,
      id: newLetter.id,
      letter: newLetter,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save letter';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
