type IconProps = { className?: string };

export function BrandMark({ className = "" }: IconProps) {
  return (
    <a className={`brand-mark ${className}`} href="/" aria-label="A Little Birthday Letter home">
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 34 34" fill="none">
          <path d="M5.5 10.5h23v15h-23z" stroke="currentColor" strokeWidth="1.4" />
          <path d="m6 11 11 9 11-9" stroke="currentColor" strokeWidth="1.4" />
          <path d="m8 24 8-7m10 7-8-7" stroke="currentColor" strokeWidth="1.2" />
          <path d="M17 9c-1.5-2.2-4.4-.7-3 1.5l3 3 3-3c1.4-2.2-1.5-3.7-3-1.5Z" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-type">
        <strong>always,</strong>
        <span>postmarked</span>
      </span>
    </a>
  );
}

function RoseBranch({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 240 300" fill="none" aria-hidden="true">
      <path d="M12 290C64 227 84 169 124 115c28-38 54-59 98-81" stroke="#b29a7a" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 248c-30-4-38-21-30-38 21 3 34 15 30 38Zm16-24c-2-27 10-43 30-43 6 21-5 37-30 43Zm26-39c-24-11-28-29-17-43 19 9 27 23 17 43Zm24-37c1-26 16-39 35-35 2 21-10 35-35 35Zm28-39c-16-20-12-38 5-47 15 16 17 31-5 47Zm29-31c9-23 26-31 43-21-5 20-19 29-43 21Z" fill="#667155" fillOpacity=".72" />
      <g transform="translate(120 106)">
        <path d="M-37 0c-12-23 7-44 26-31 13-22 42-10 39 12 23 10 18 39-6 43-4 24-33 30-46 10-24 5-39-18-25-34-7 1-8 1 12 0Z" fill="#7d3448" />
        <path d="M-29-6c-5-17 9-30 23-20 10-16 30-9 28 8 17 8 13 27-5 30-3 17-24 22-34 7-17 4-28-13-18-25Z" fill="#bb6570" />
        <path d="M-17-4c-2-9 7-16 14-10 7-9 18-4 17 5 10 5 6 16-4 17-2 11-14 13-19 4-11 2-16-9-8-16Z" fill="#e7a0a0" />
        <path d="M-8-4c0-7 9-9 12-3 7-2 11 7 5 11-3 8-11 7-14 1-7 0-9-7-3-9Z" fill="#f0c9a8" />
      </g>
      <g transform="translate(62 217) scale(.62)">
        <path d="M-37 0c-12-23 7-44 26-31 13-22 42-10 39 12 23 10 18 39-6 43-4 24-33 30-46 10-24 5-39-18-25-34Z" fill="#673044" />
        <path d="M-29-6c-5-17 9-30 23-20 10-16 30-9 28 8 17 8 13 27-5 30-3 17-24 22-34 7-17 4-28-13-18-25Z" fill="#b15d6b" />
        <path d="M-15-4c-2-9 7-16 14-10 7-9 18-4 17 5 10 5 6 16-4 17-2 11-14 13-19 4-11 2-16-9-8-16Z" fill="#e39a9b" />
      </g>
      <path d="m103 164 17-11m45-48 17-11" stroke="#c7a274" strokeOpacity=".65" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RomanticBackdrop() {
  return (
    <div className="romantic-backdrop" aria-hidden="true">
      <span className="ambient-glow glow-upper" />
      <span className="ambient-glow glow-lower" />
      <RoseBranch className="ambient-botanical botanical-left" />
      <RoseBranch className="ambient-botanical botanical-right" />
      <span className="ambient-candle candle-left"><i /></span>
      <span className="ambient-candle candle-right"><i /></span>
    </div>
  );
}

export function PostcardIllustration({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 390 320" role="img" aria-label="An illustrated birthday postcard with a stamp and a wax seal">
      <defs>
        <linearGradient id="postcard-paper" x1="47" y1="25" x2="322" y2="271" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8ed" />
          <stop offset="1" stopColor="#f0ddca" />
        </linearGradient>
      </defs>
      <g transform="rotate(5 190 157)">
        <rect x="58" y="34" width="275" height="246" rx="3" fill="#d8c9b8" opacity=".42" />
        <rect x="47" y="25" width="275" height="246" rx="3" fill="url(#postcard-paper)" stroke="#d5b99a" />
        <text x="68" y="68" fill="#786c60" fontSize="8" letterSpacing="2.2" fontFamily="Arial, sans-serif">A LITTLE SOMETHING FOR YOU</text>
        <text x="67" y="116" fill="#4a302b" fontSize="31" fontFamily="Georgia, serif" fontStyle="italic">for your</text>
        <text x="67" y="151" fill="#9c3743" fontSize="36" fontFamily="Georgia, serif" fontStyle="italic">birthday</text>
        <path d="M76 201c7-14 20-19 29-8 13-8 25 3 19 16 10 11 1 25-14 23-8 14-25 9-25-6-13-7-16-19-9-25Z" fill="#9f4355" />
        <path d="M82 203c3-10 13-14 20-7 8-7 17-1 15 7 8 5 3 14-6 15-5 10-17 7-18-2-9-4-15-7-11-13Z" fill="#d78385" />
        <path d="M86 205c4-5 9-6 13-2 4-4 11-1 10 5 4 3 1 8-4 8-3 5-10 5-12 0-6-2-10-6-7-11Z" fill="#f0b4a5" />
        <path d="M97 218c-1 17 2 29 7 38m-5-17c-12-1-17-6-18-13 10-1 16 3 18 13Zm2 6c10-6 17-6 23-1-5 9-12 11-23 1Z" fill="none" stroke="#6f7659" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="249" y="44" width="47" height="60" rx="1" fill="#f5e4d7" stroke="#a34550" strokeDasharray="2 2" />
        <rect x="255" y="50" width="35" height="47" fill="#e8cdc3" />
        <path d="M258 86c7-13 15-12 28 0M259 80l8-13 7 9 5-6 8 11" fill="none" stroke="#7e7160" strokeWidth="1.2" />
        <circle cx="278" cy="62" r="3" fill="#b7665f" />
        <text x="258" y="113" fill="#8c454a" fontSize="6" letterSpacing="1" fontFamily="Arial, sans-serif">POST FOR YOU</text>
        <circle cx="280" cy="221" r="25" fill="#8f3742" />
        <circle cx="280" cy="221" r="19" fill="none" stroke="#dca29a" strokeWidth="1" />
        <path d="M280 214c-3-5-9-2-6 3l6 6 6-6c3-5-3-8-6-3Z" fill="#f5ded4" />
        <path d="M244 250c11-6 23-6 33 0" stroke="#b4a58f" strokeWidth="1" strokeLinecap="round" />
        <path d="m326 48 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z" fill="#be8b57" />
      </g>
      <path d="M34 228c8-7 14-6 17 2-6 5-12 5-17-2Zm14 0c-1-8 2-13 9-14 2 7 0 12-9 14Zm-7 10c7-1 12 2 13 8-6 3-11 0-13-8Zm0 0-3 17" fill="none" stroke="#788065" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M356 112c-1-6 5-9 8-4 3-5 9-2 8 4-1 4-6 8-8 10-2-2-7-6-8-10Z" fill="#bc6d69" opacity=".8" />
      <path d="m356 210 1.8 5.5 5.7 1.8-5.7 1.8-1.8 5.7-1.8-5.7-5.7-1.8 5.7-1.8 1.8-5.5Z" fill="#c39158" />
    </svg>
  );
}

export function EnvelopeIllustration({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 440 300" role="img" aria-label="A cream envelope sealed with a little red heart">
      <ellipse cx="218" cy="256" rx="151" ry="17" fill="#4a2e27" opacity=".11" />
      <g transform="rotate(-2 220 153)">
        <rect x="62" y="57" width="316" height="191" rx="8" fill="#e9dfd2" />
        <path d="M72 70c0-5 4-9 9-9h278c5 0 9 4 9 9v155H72V70Z" fill="#f8f1e7" stroke="#d8cabb" />
        <path d="m72 70 148 111L368 70" fill="#f3eadf" stroke="#d8cabb" strokeWidth="1.3" />
        <path d="M72 225 184 142m184 83-112-83" stroke="#d6c7b7" strokeWidth="1.3" />
        <path d="M72 225c0 5 4 9 9 9h278c5 0 9-4 9-9l-148-111L72 225Z" fill="#fffaf2" stroke="#d8cabb" strokeWidth="1.3" />
        <circle cx="220" cy="165" r="30" fill="#9d3d48" />
        <circle cx="220" cy="165" r="23" fill="none" stroke="#d79b91" strokeWidth="1.2" />
        <path d="M220 159c-5-8-14-3-10 5 2 4 7 8 10 10 3-2 8-6 10-10 4-8-5-13-10-5Z" fill="#f6e2d6" />
        <text x="112" y="94" fill="#8b7e6e" fontSize="8" letterSpacing="2" fontFamily="Arial, sans-serif">SEALED WITH A LITTLE LOVE</text>
      </g>
      <path d="M41 137c-1-7 6-10 9-4 4-6 10-3 9 4-1 5-6 9-9 11-2-2-8-7-9-11Z" fill="#b36364" opacity=".82" />
      <path d="m385 107 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="#bd8c58" />
      <path d="M374 205c8-8 15-6 17 2-7 5-12 5-17-2Zm14 0c-1-8 2-13 9-14 2 7 0 12-9 14Zm-7 10c7-1 12 2 13 8-6 3-11 0-13-8Zm0 0-3 17" fill="none" stroke="#798067" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 16" fill="none">
      <path d="M9 14.2 2.4 7.8C-1.7 3.3 4.3-1 9 4.2 13.7-1 19.7 3.3 15.6 7.8L9 14.2Z" fill="currentColor" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect x="7" y="3.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 6.5h-.5A1.5 1.5 0 0 0 3 8v8.5A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5V16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
