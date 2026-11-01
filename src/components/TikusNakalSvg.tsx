/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TikusNakalSvgProps {
  mood?: 'sneaky' | 'giggling' | 'surprised';
  className?: string;
  size?: number;
}

export const TikusNakalSvg: React.FC<TikusNakalSvgProps> = ({
  mood = 'sneaky',
  className = '',
  size = 150,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Tikus Nakal Si Pencuri Huruf"
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Ground shadow */}
        <ellipse cx="90" cy="168" rx="50" ry="8" fill="#E2E8F0" />

        {/* Long skinny tail */}
        <path
          d="M 45 145 C 20 145 10 115 25 100 C 35 90 40 105 32 112"
          stroke="#FDA4AF"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Bag of Stolen Letters (Karung Huruf Rahasia) */}
        <g id="stolen-sack">
          <ellipse cx="132" cy="140" rx="28" ry="24" fill="#D97706" />
          <path
            d="M 120 120 C 122 110 138 110 142 120 Z"
            fill="#B45309"
          />
          {/* Rope tie */}
          <ellipse cx="131" cy="120" rx="9" ry="3" fill="#FDE68A" />
          {/* Letter sticking out of bag */}
          <rect x="124" y="105" width="16" height="18" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" transform="rotate(12 124 105)" />
          <text x="131" y="119" fontSize="11" fontWeight="bold" fill="#713F12" textAnchor="middle" transform="rotate(12 131 119)">
            ?
          </text>
        </g>

        {/* Mouse Body */}
        <ellipse cx="88" cy="135" rx="32" ry="28" fill="#94A3B8" />
        <ellipse cx="88" cy="138" rx="20" ry="18" fill="#E2E8F0" />

        {/* Left Big Round Ear */}
        <circle cx="58" cy="68" r="24" fill="#94A3B8" />
        <circle cx="58" cy="68" r="16" fill="#F472B6" opacity="0.8" />

        {/* Right Big Round Ear */}
        <circle cx="118" cy="68" r="24" fill="#94A3B8" />
        <circle cx="118" cy="68" r="16" fill="#F472B6" opacity="0.8" />

        {/* Mouse Head */}
        <circle cx="88" cy="94" r="32" fill="#94A3B8" />

        {/* Cheeky Bandit Mask (Purple / Indigo) */}
        <path
          d="M 60 88 C 72 82 104 82 116 88 C 114 100 102 104 88 100 C 74 104 62 100 60 88 Z"
          fill="#475569"
        />

        {/* Eyes according to mood */}
        {mood === 'surprised' ? (
          // Wide open surprised eyes (O_O)
          <g>
            <circle cx="76" cy="90" r="8" fill="#FFFFFF" />
            <circle cx="76" cy="90" r="4.5" fill="#0F172A" />
            <circle cx="78" cy="88" r="1.5" fill="#FFFFFF" />

            <circle cx="100" cy="90" r="8" fill="#FFFFFF" />
            <circle cx="100" cy="90" r="4.5" fill="#0F172A" />
            <circle cx="102" cy="88" r="1.5" fill="#FFFFFF" />
          </g>
        ) : mood === 'giggling' ? (
          // Squinting sneaky laughing eyes (>_<)
          <g stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M 72 88 L 78 92 L 72 96" />
            <path d="M 104 88 L 98 92 L 104 96" />
          </g>
        ) : (
          // Sneaky sly sideways glance
          <g>
            <circle cx="76" cy="90" r="6" fill="#FFFFFF" />
            <circle cx="78" cy="90" r="3.5" fill="#0F172A" />
            <circle cx="79.5" cy="89" r="1" fill="#FFFFFF" />

            <circle cx="100" cy="90" r="6" fill="#FFFFFF" />
            <circle cx="102" cy="90" r="3.5" fill="#0F172A" />
            <circle cx="103.5" cy="89" r="1" fill="#FFFFFF" />
          </g>
        )}

        {/* Snout & Cute Pink Nose */}
        <ellipse cx="88" cy="106" rx="14" ry="10" fill="#CBD5E1" />
        <ellipse cx="88" cy="102" rx="5" ry="3.5" fill="#F43F5E" />

        {/* Whiskers */}
        <g stroke="#475569" strokeWidth="2" strokeLinecap="round">
          <line x1="72" y1="104" x2="48" y2="100" />
          <line x1="72" y1="108" x2="46" y2="110" />
          <line x1="104" y1="104" x2="128" y2="100" />
          <line x1="104" y1="108" x2="130" y2="110" />
        </g>

        {/* Mouth */}
        {mood === 'giggling' ? (
          // Laughing open mouth
          <path
            d="M 83 109 C 83 118 93 118 93 109 Z"
            fill="#BE123C"
            stroke="#475569"
            strokeWidth="2"
          />
        ) : mood === 'surprised' ? (
          // Small 'O' shape
          <circle cx="88" cy="112" r="4.5" fill="#BE123C" stroke="#475569" strokeWidth="2" />
        ) : (
          // Sly smirk
          <path
            d="M 83 109 C 87 112 92 110 94 107"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Paws */}
        {mood === 'giggling' ? (
          // Paw over mouth giggling "Hehe!"
          <g>
            <circle cx="88" cy="116" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Playful giggling sound text bubble */}
            <g transform="translate(112, 50)">
              <rect x="0" y="0" width="46" height="24" rx="8" fill="#FEE2E2" stroke="#F87171" strokeWidth="2" />
              <text x="23" y="16" fontSize="11" fontWeight="bold" fill="#B91C1C" textAnchor="middle">
                Hehe!
              </text>
            </g>
          </g>
        ) : mood === 'surprised' ? (
          // Both paws to head in shock
          <g>
            <circle cx="62" cy="100" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="114" cy="100" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        ) : (
          // Holding the stolen sack
          <g>
            <circle cx="112" cy="130" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="68" cy="136" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
};
