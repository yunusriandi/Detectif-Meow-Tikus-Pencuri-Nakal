/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TreasureChestSvgProps {
  status?: 'locked' | 'unlocking' | 'opened';
  className?: string;
  size?: number;
}

export const TreasureChestSvg: React.FC<TreasureChestSvgProps> = ({
  status = 'locked',
  className = '',
  size = 140,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Peti Rahasia Harta Karun"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="148" rx="60" ry="8" fill="#CBD5E1" opacity="0.6" />

        {/* Opened glow rays */}
        {status === 'opened' && (
          <g>
            <circle cx="80" cy="70" r="45" fill="url(#chest-glow-grad)" opacity="0.8" />
            {/* Light beams */}
            <path d="M 80 70 L 60 10 L 75 10 Z" fill="#FDE047" opacity="0.4" />
            <path d="M 80 70 L 85 8 L 98 10 Z" fill="#FDE047" opacity="0.5" />
            <path d="M 80 70 L 115 20 L 125 28 Z" fill="#FDE047" opacity="0.4" />
            <path d="M 80 70 L 35 25 L 45 18 Z" fill="#FDE047" opacity="0.4" />

            {/* Sparkle stars flying out */}
            <polygon points="70,30 72,35 78,36 73,40 75,46 70,42 65,46 67,40 62,36 68,35" fill="#FBBF24" />
            <polygon points="105,35 107,39 112,40 108,44 109,49 105,46 101,49 102,44 98,40 103,39" fill="#FBBF24" />
            <polygon points="85,18 86,22 91,23 87,26 88,31 85,28 82,31 83,26 79,23 84,22" fill="#F59E0B" />
          </g>
        )}

        <defs>
          <radialGradient id="chest-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Chest Base (Wooden Box) */}
        <rect x="25" y="80" width="110" height="62" rx="10" fill="#78350F" stroke="#451A03" strokeWidth="3" />

        {/* Chest Planks divider */}
        <line x1="25" y1="100" x2="135" y2="100" stroke="#5C2509" strokeWidth="2.5" />
        <line x1="25" y1="120" x2="135" y2="120" stroke="#5C2509" strokeWidth="2.5" />

        {/* Golden Straps Vertical */}
        <rect x="42" y="80" width="14" height="62" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="49" cy="90" r="2.5" fill="#78350F" />
        <circle cx="49" cy="110" r="2.5" fill="#78350F" />
        <circle cx="49" cy="130" r="2.5" fill="#78350F" />

        <rect x="104" y="80" width="14" height="62" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="111" cy="90" r="2.5" fill="#78350F" />
        <circle cx="111" cy="110" r="2.5" fill="#78350F" />
        <circle cx="111" cy="130" r="2.5" fill="#78350F" />

        {/* Inside Treasure if Opened */}
        {status === 'opened' && (
          <g>
            {/* Pile of gold coins and jewels */}
            <ellipse cx="80" cy="84" rx="42" ry="12" fill="#D97706" />
            <circle cx="65" cy="82" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <circle cx="78" cy="80" r="8" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
            <circle cx="92" cy="82" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <circle cx="70" cy="86" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <circle cx="85" cy="85" r="7" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
            {/* Ruby Gem */}
            <polygon points="78,74 84,74 88,78 81,84 74,78" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
          </g>
        )}

        {/* Chest Lid */}
        {status === 'opened' ? (
          // Lid open angled back
          <g transform="translate(18, 20) rotate(-22 80 80)">
            <path
              d="M 20 62 C 20 40 120 40 120 62 Z"
              fill="#92400E"
              stroke="#451A03"
              strokeWidth="3"
            />
            {/* Golden Straps on Open Lid */}
            <path d="M 38 62 C 38 43 48 43 48 62" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <path d="M 92 62 C 92 43 102 43 102 62" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          </g>
        ) : (
          // Lid Closed
          <g>
            <path
              d="M 22 80 C 22 50 138 50 138 80 Z"
              fill="#92400E"
              stroke="#451A03"
              strokeWidth="3"
            />
            {/* Straps on Closed Lid */}
            <path d="M 42 80 C 42 54 56 54 56 80" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="49" cy="66" r="2.5" fill="#78350F" />
            <path d="M 104 80 C 104 54 118 54 118 80" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="111" cy="66" r="2.5" fill="#78350F" />
          </g>
        )}

        {/* Center Golden Lock Bracket */}
        <g id="center-lock">
          <rect x="70" y="74" width="20" height="26" rx="5" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
          {/* Keyhole */}
          <circle cx="80" cy="84" r="3.5" fill="#78350F" />
          <polygon points="78,84 82,84 83,92 77,92" fill="#78350F" />
        </g>

        {/* Golden Key Animating In when Unlocking */}
        {status === 'unlocking' && (
          <g className="animate-key-float" transform="translate(80, 84)">
            {/* Golden Key Icon */}
            <circle cx="-16" cy="-16" r="8" fill="none" stroke="#FBBF24" strokeWidth="4" />
            <circle cx="-16" cy="-16" r="3" fill="#D97706" />
            <rect x="-8" y="-18" width="24" height="4" fill="#FBBF24" />
            <rect x="8" y="-14" width="4" height="6" fill="#FBBF24" />
            <rect x="2" y="-14" width="4" height="5" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </div>
  );
};
