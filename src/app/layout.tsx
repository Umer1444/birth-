import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Candlelit Birthday Letter For Him',
  description: 'An intimate, candlelit keepsake birthday letter written for him with personalized memories and melody.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#120610] text-[#f7e6e8] font-sans antialiased selection:bg-[#9b1c36] selection:text-[#fffdf9]">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="stardust" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
