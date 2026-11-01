/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LetterTile } from '../types/game';

interface LetterBankProps {
  tiles: LetterTile[];
  onSelectLetter: (tile: LetterTile) => void;
  hintLetter?: string | null;
}

export const LetterBank: React.FC<LetterBankProps> = ({
  tiles,
  onSelectLetter,
  hintLetter,
}) => {
  const handleDragStart = (e: React.DragEvent, tile: LetterTile) => {
    if (tile.isUsed) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', tile.letter);
    e.dataTransfer.setData('application/bank-id', tile.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-full flex flex-col items-center mt-3">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider">
          Pilihan Huruf (Ketuk atau Geser ke Kotak)
        </span>
      </div>

      {/* Tiles container */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl p-2">
        {tiles.map((tile) => {
          const isHinted = hintLetter === tile.letter && !tile.isUsed;

          if (tile.isUsed) {
            return (
              <div
                key={tile.id}
                className="w-13 h-14 sm:w-16 sm:h-18 rounded-2xl bg-slate-200/60 border-2 border-slate-300 flex items-center justify-center text-xl sm:text-3xl font-bold text-slate-400 select-none opacity-40 cursor-not-allowed"
              >
                {tile.letter}
              </div>
            );
          }

          return (
            <button
              key={tile.id}
              draggable
              onDragStart={(e) => handleDragStart(e, tile)}
              onClick={() => onSelectLetter(tile)}
              className={`w-13 h-15 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center text-2xl sm:text-3xl font-extrabold cursor-pointer transition-all active:scale-95 select-none ${
                isHinted
                  ? 'bg-amber-400 border-b-6 border-amber-600 text-amber-950 animate-bounce ring-4 ring-yellow-400 shadow-lg'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-300 border-b-6 border-b-amber-500 shadow-md hover:-translate-y-1 active:translate-y-0.5 active:border-b-2'
              }`}
              title={`Pilih huruf ${tile.letter}`}
            >
              <span>{tile.letter}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
