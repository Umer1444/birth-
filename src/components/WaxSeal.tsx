'use client';

import React from 'react';

interface WaxSealProps {
  initials?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function WaxSeal({
  initials = '♥',
  size = 64,
  className = '',
  onClick,
  interactive = false,
}: WaxSealProps) {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : 'img'}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      aria-label="Decorative wax seal"
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer transform hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient
            id="waxGradient"
            cx="40%"
            cy="35%"
            r="65%"
            fx="35%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#c5304e" />
            <stop offset="40%" stopColor="#9b1c36" />
            <stop offset="85%" stopColor="#6e0f23" />
            <stop offset="100%" stopColor="#480715" />
          </radialGradient>
          <radialGradient
            id="goldShine"
            cx="35%"
            cy="35%"
            r="50%"
          >
            <stop offset="0%" stopColor="#f7e1a0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
          <filter id="waxTexture" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2b050c" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Irregular organic wax outer edge */}
        <path
          d="M50 4 C65 2, 82 12, 90 26 C98 40, 96 62, 88 76 C80 90, 62 96, 48 97 C32 98, 14 90, 8 74 C2 58, 6 36, 15 22 C24 8, 38 6, 50 4 Z"
          fill="url(#waxGradient)"
          filter="url(#waxTexture)"
        />

        {/* Inner rim ridge */}
        <circle
          cx="50"
          cy="50"
          r="33"
          stroke="#520b1a"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          fill="none"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="31"
          stroke="#e5989b"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Candlelight gold highlight */}
        <ellipse
          cx="38"
          cy="36"
          rx="24"
          ry="16"
          fill="url(#goldShine)"
        />

        {/* Botanical sprigs & emblem */}
        <g stroke="#fce7ea" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
          <path d="M50 72 C50 64, 46 58, 38 52" fill="none" />
          <path d="M50 72 C50 64, 54 58, 62 52" fill="none" />
          <circle cx="38" cy="52" r="1.5" fill="#fce7ea" />
          <circle cx="62" cy="52" r="1.5" fill="#fce7ea" />
        </g>

        {/* Center monogram / icon */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fce7ea"
          fontSize="24"
          fontFamily="serif"
          fontWeight="bold"
          opacity="0.95"
          style={{ textShadow: '0 1px 2px rgba(40, 0, 10, 0.6)' }}
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
