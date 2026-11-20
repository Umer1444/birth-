import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#9b1c36]/20 border border-[#9b1c36]/40 flex items-center justify-center text-3xl mb-4">
        ✉
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#fae7b5] mb-2">
        Letter Not Found
      </h1>
      <p className="max-w-md text-sm text-[#f5dfb8]/80 leading-relaxed mb-6">
        This candlelit letter could not be found. The link might be expired, private, or mistyped.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full font-serif font-medium text-sm text-[#2a0e19] bg-gradient-to-r from-[#fae7b5] to-[#e4ba5a] hover:from-[#fff0c8] hover:to-[#ecc46c] transition-all"
      >
        Make a New Letter for Him
      </Link>
    </main>
  );
}
