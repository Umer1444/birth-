import type { Metadata } from "next";
import { RecipientLetter } from "@/components/recipient-letter";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "A letter for you",
    description: "A personal birthday letter, made just for you.",
    robots: { index: false, follow: false },
  };
}

export default async function LetterPage({ params }: PageProps) {
  const { id } = await params;
  return <RecipientLetter id={id} />;
}
