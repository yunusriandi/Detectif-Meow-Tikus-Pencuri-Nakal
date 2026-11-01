/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, Sparkles, RotateCcw, Lightbulb } from 'lucide-react';
import { WordItem } from '../types/game';

interface WordPlayAreaProps {
  currentWord: WordItem;
  placedLetters: { [slotIndex: number]: { letter: string; bankId: string } };
  onSlotClick: (slotIndex: number) => void;
  onDropLetter: (slotIndex: number, letter: string, bankId: string) => void;
  onPlayClueAudio: () => void;
  onUseHint: () => void;
  onResetSlots: () => void;
  isShakeError: boolean;
  highlightSlotIndex: number | null;
}

export const WordPlayArea: React.FC<WordPlayAreaProps> = ({
  currentWord,
  placedLetters,
  onSlotClick,
  onDropLetter,
  onPlayClueAudio,
  onUseHint,
  onResetSlots,
  isShakeError,
  highlightSlotIndex,
}) => {
  const letters = currentWord.word.split('');
  const hasPlacedAny = Object.keys(placedLetters).length > 0;

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle Drop onto Slot
  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    const bankId = e.dataTransfer.getData('application/bank-id');
    if (letter && bankId) {
      onDropLetter(slotIndex, letter, bankId);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Clue Card */}
      <div className="w-full max-w-xl bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm text-center relative overflow-hidden mb-6">
        {/* Subtle paw background watermark */}
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 pointer-events-none select-none">
          🐾
        </div>

        {/* Zone, Difficulty & Category Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Zone Tag */}
            {currentWord.zone && (
              <span className="px-2.5 py-0.5 bg-amber-200/90 border border-amber-400 rounded-full text-[11px] font-extrabold text-amber-950">
                {currentWord.zone}
              </span>
            )}
            {/* Difficulty Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                currentWord.difficulty === 'MASTER'
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : currentWord.difficulty === 'SULIT'
                  ? 'bg-orange-100 text-orange-900 border-orange-300'
                  : currentWord.difficulty === 'SEDANG'
                  ? 'bg-amber-200 text-amber-900 border-amber-400'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              {currentWord.hiddenIndices.length} Huruf Hilang ({currentWord.difficulty || 'MUDAH'})
            </span>
            {/* Category */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/80 border border-amber-300 rounded-full text-[11px] font-bold text-amber-900">
              <span>{currentWord.categoryIcon}</span>
              <span>{currentWord.category}</span>
            </div>
          </div>

          <button
            onClick={onPlayClueAudio}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all ml-auto cursor-pointer"
            title="Dengarkan Suara Petunjuk"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        {/* Clue Text */}
        <p className="text-base sm:text-xl font-bold text-amber-950 leading-relaxed px-2">
          "{currentWord.clue}"
        </p>
      </div>

      {/* Kata Rumpang Boxes (Cloze Word Slots) */}
      <div
        className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 p-4 rounded-3xl bg-amber-100/70 border-2 border-amber-200/80 mb-5 transition-transform ${
          isShakeError ? 'animate-wiggle-playful' : ''
        }`}
      >
        {letters.map((char, index) => {
          const isBlank = currentWord.hiddenIndices.includes(index);
          const placed = placedLetters[index];
          const isHighlighted = highlightSlotIndex === index;

          if (!isBlank) {
            // Known Static Letter
            return (
              <div
                key={`static-${index}`}
                className="w-13 h-15 sm:w-16 sm:h-18 md:w-20 md:h-22 bg-amber-200/80 border-3 border-amber-400 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 shadow-sm select-none"
              >
                {char}
              </div>
            );
          }

          // Secret Missing Slot
          return (
            <div
              key={`blank-${index}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => onSlotClick(index)}
              className={`w-13 h-15 sm:w-16 sm:h-18 md:w-20 md:h-22 rounded-2xl flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold cursor-pointer transition-all relative select-none ${
                placed
                  ? 'bg-amber-400 border-3 border-amber-600 text-amber-950 shadow-md transform hover:-translate-y-0.5 active:translate-y-0'
                  : isHighlighted
                  ? 'bg-yellow-200 border-4 border-dashed border-amber-500 animate-pulse text-amber-700 shadow-md ring-4 ring-yellow-300'
                  : 'bg-white border-3 border-dashed border-amber-400 hover:border-amber-600 text-amber-300 shadow-inner'
              }`}
            >
              {placed ? (
                <>
                  <span>{placed.letter}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-900 absolute bottom-1">
                    Ketuk lepas
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-70">
                  <span className="text-xl sm:text-2xl text-amber-500">🔍</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-700">isi di sini</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Auxiliary Help / Reset Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onUseHint}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 border-2 border-amber-300 text-xs sm:text-sm font-bold active:scale-95 transition-all shadow-xs"
        >
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Bantuan Huruf</span>
        </button>

        {hasPlacedAny && (
          <button
            onClick={onResetSlots}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 text-xs sm:text-sm font-bold active:scale-95 transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Kembalikan Huruf</span>
          </button>
        )}
      </div>
    </div>
  );
};
