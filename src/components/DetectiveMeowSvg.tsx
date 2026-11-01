/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface DetectiveMeowSvgProps {
  mood?: 'idle' | 'thinking' | 'celebrating' | 'encouraging';
  className?: string;
  size?: number;
}

export const DetectiveMeowSvg: React.FC<DetectiveMeowSvgProps> = ({
  mood = 'idle',
  className = '',
  size = 180,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Detektif Meow Kucing Cerdas"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Shadow */}
        <ellipse cx="100" cy="188" rx="65" ry="10" fill="#E2E8F0" />

        {/* Tail with Detective Cap Ring */}
        <path
          d="M 140 160 C 165 160 178 140 172 120 C 166 100 150 110 155 125"
          stroke="#F59E0B"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 158 122 C 162 115 168 118 170 123"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Cat Body (Trenchcoat & Fur) */}
        <path
          d="M 68 120 C 60 145 62 180 100 180 C 138 180 140 145 132 120 Z"
          fill="#FDE68A"
        />

        {/* Detective Coat / Cape (Warm Amber & Brown Collar) */}
        <path
          d="M 64 125 C 64 165 80 182 100 182 C 120 182 136 165 136 125 C 122 132 100 135 78 128 Z"
          fill="#B45309"
        />
        {/* Cape Trim */}
        <path
          d="M 72 128 L 100 150 L 128 128"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Detective Golden Star Badge */}
        <polygon
          points="100,140 103,148 111,148 105,153 107,161 100,156 93,161 95,153 89,148 97,148"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="1.5"
        />

        {/* Head Base */}
        <circle cx="100" cy="92" r="48" fill="#FDE68A" />

        {/* Left Ear */}
        <path
          d="M 62 68 L 48 30 C 58 28 78 40 82 54 Z"
          fill="#F59E0B"
        />
        <path
          d="M 62 62 L 54 38 C 60 36 72 44 75 52 Z"
          fill="#FDA4AF"
        />

        {/* Right Ear */}
        <path
          d="M 138 68 L 152 30 C 142 28 122 40 118 54 Z"
          fill="#F59E0B"
        />
        <path
          d="M 138 62 L 146 38 C 140 36 128 44 125 52 Z"
          fill="#FDA4AF"
        />

        {/* Detective Deerstalker Hat */}
        <g id="detective-hat">
          {/* Hat Dome */}
          <path
            d="M 60 62 C 62 30 138 30 140 62 C 125 58 75 58 60 62 Z"
            fill="#78350F"
          />
          {/* Hat Pattern check lines */}
          <path
            d="M 80 44 L 80 60 M 100 38 L 100 60 M 120 44 L 120 60"
            stroke="#92400E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hat Front Brim */}
          <path
            d="M 52 64 C 70 56 130 56 148 64 C 130 68 70 68 52 64 Z"
            fill="#92400E"
          />
          {/* Hat Ribbon */}
          <path
            d="M 58 62 C 75 57 125 57 142 62"
            stroke="#F59E0B"
            strokeWidth="4"
          />
          {/* Hat Top Button */}
          <circle cx="100" cy="36" r="5" fill="#B45309" />
        </g>

        {/* Cheeks blush */}
        <ellipse cx="72" cy="106" rx="9" ry="5" fill="#FECDD3" opacity="0.8" />
        <ellipse cx="128" cy="106" rx="9" ry="5" fill="#FECDD3" opacity="0.8" />

        {/* Eyes according to mood */}
        {mood === 'celebrating' ? (
          // Joyful closed curved eyes (^_^)
          <g>
            <path
              d="M 72 90 C 76 82 86 82 90 90"
              stroke="#451A03"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 110 90 C 114 82 124 82 128 90"
              stroke="#451A03"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : mood === 'thinking' ? (
          // One eye squinting thoughtfully, one wide
          <g>
            <circle cx="80" cy="88" r="8" fill="#451A03" />
            <circle cx="82" cy="86" r="2.5" fill="#FFFFFF" />
            <path
              d="M 110 88 C 114 84 124 84 128 88"
              stroke="#451A03"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : (
          // Big, friendly, sparkling round eyes
          <g>
            <circle cx="81" cy="88" r="8" fill="#451A03" />
            <circle cx="83.5" cy="85.5" r="3" fill="#FFFFFF" />
            <circle cx="79" cy="91" r="1.5" fill="#FFFFFF" />

            <circle cx="119" cy="88" r="8" fill="#451A03" />
            <circle cx="121.5" cy="85.5" r="3" fill="#FFFFFF" />
            <circle cx="117" cy="91" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Whiskers */}
        <g stroke="#92400E" strokeWidth="2.5" strokeLinecap="round">
          {/* Left */}
          <line x1="68" y1="99" x2="42" y2="96" />
          <line x1="68" y1="104" x2="40" y2="106" />
          {/* Right */}
          <line x1="132" y1="99" x2="158" y2="96" />
          <line x1="132" y1="104" x2="160" y2="106" />
        </g>

        {/* Nose (Pink Heart / Triangle) */}
        <path
          d="M 96 98 C 96 95 104 95 104 98 C 104 102 100 104 100 104 C 100 104 96 102 96 98 Z"
          fill="#FB7185"
        />

        {/* Cat Mouth */}
        {mood === 'celebrating' ? (
          // Open cheerful smile
          <path
            d="M 92 105 C 92 118 108 118 108 105 Z"
            fill="#E11D48"
            stroke="#451A03"
            strokeWidth="2.5"
          />
        ) : (
          // Classic cat :3 mouth
          <path
            d="M 92 105 C 96 110 100 107 100 104 C 100 107 104 110 108 105"
            stroke="#451A03"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Paws & Magnifying Glass */}
        {mood === 'celebrating' ? (
          // Both paws up in celebration!
          <g>
            <circle cx="58" cy="120" r="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="142" cy="120" r="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
          </g>
        ) : (
          // Paw holding iconic detective magnifying glass
          <g id="magnifying-glass-paw">
            {/* Paw holding handle */}
            <circle cx="56" cy="136" r="11" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />

            {/* Magnifying Glass */}
            <g transform="translate(30, 96) rotate(-20)">
              {/* Handle */}
              <rect x="18" y="44" width="8" height="26" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="22" cy="68" r="3" fill="#F59E0B" />
              {/* Glass Rim */}
              <circle cx="22" cy="24" r="22" fill="#E0F2FE" fillOpacity="0.75" stroke="#F59E0B" strokeWidth="5" />
              {/* Lens shine */}
              <path
                d="M 12 14 C 18 8 28 8 32 12"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Sparkle */}
              <polygon
                points="22,18 24,22 28,22 25,25 26,29 22,26 18,29 19,25 16,22 20,22"
                fill="#38BDF8"
              />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
