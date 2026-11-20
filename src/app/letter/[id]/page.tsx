import { Metadata } from 'next';
import { getLetterById } from '@/lib/storage';
import { LetterView } from './LetterView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const letter = await getLetterById(id);

  const recipient = letter?.recipientName || 'Him';
  return {
    title: `A Birthday Letter For ${recipient}`,
    description: `A candlelit birthday keepsake letter created especially for ${recipient}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LetterPage({ params }: PageProps) {
  const { id } = await params;
  const letter = await getLetterById(id);

  return <LetterView initialLetter={letter} letterId={id} />;
}
