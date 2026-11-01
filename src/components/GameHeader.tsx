/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Sparkles, Key, Star, GraduationCap, HelpCircle, Lock, Map } from 'lucide-react';
import { GameMode, PlayerStats } from '../types/game';

interface GameHeaderProps {
  stats: PlayerStats;
  currentWordIndex: number;
  totalWords: number;
  gameMode: GameMode;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTeacherPanel: () => void;
  onOpenHelp: () => void;
  onOpenLevelMap: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  stats,
  currentWordIndex,
  totalWords,
  gameMode,
  isMuted,
  onToggleMute,
  onOpenTeacherPanel,
  onOpenHelp,
  onOpenLevelMap,
}) => {
  const getModeLabel = () => {
    switch (gameMode) {
      case 'CUSTOM_ONLY':
        return 'Khusus Soal Guru';
      case 'DEFAULT_ONLY':
        return 'Soal Bawaan';
      default:
        return 'Mode Gabungan';
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b-4 border-amber-300 shadow-sm px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 border-2 border-amber-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner transform -rotate-3 select-none">
            🐱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-amber-950 whitespace-nowrap leading-tight">
                Detektif Meow
              </h1>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-300 hidden md:inline-block">
                Fase A SD
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-700 font-medium">
              <span>Jejak Tikus Nakal</span>
              <span>·</span>
              <span className="font-semibold text-amber-900">{getModeLabel()}</span>
            </div>
          </div>
        </div>

        {/* Center Progress & Stats */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Interactive Level Map Button */}
          <button
            onClick={onOpenLevelMap}
            className="flex items-center gap-1.5 bg-amber-100/90 hover:bg-amber-200 border-2 border-amber-400 rounded-2xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-sm active:scale-95 transition-all cursor-pointer group"
            title="Buka Peta Level Permainan"
          >
            <Map className="w-4 h-4 text-amber-800 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] text-amber-800 font-bold uppercase tracking-wider">Level</span>
              <span className="text-xs sm:text-sm font-black text-amber-950 tabular-nums">
                {currentWordIndex + 1} / {totalWords}
              </span>
            </div>
          </button>

          {/* Stars Collected */}
          <div className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-2.5 sm:px-3 py-1 shadow-sm">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-400 drop-shadow-sm animate-pulse" />
            <span className="text-sm sm:text-base font-extrabold text-amber-900 tabular-nums">
              {stats.stars}
            </span>
          </div>

          {/* Golden Keys Collected */}
          <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-400 rounded-2xl px-2.5 sm:px-3 py-1 shadow-sm">
            <Key className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 drop-shadow-sm" />
            <span className="text-sm sm:text-base font-extrabold text-amber-950 tabular-nums">
              {stats.keys}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 border-2 border-slate-300 text-slate-700 flex items-center justify-center transition-all"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />}
          </button>

          {/* Help / Cara Bermain */}
          <button
            onClick={onOpenHelp}
            aria-label="Petunjuk Cara Bermain"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-100 hover:bg-sky-200 active:scale-95 border-2 border-sky-300 text-sky-800 flex items-center justify-center transition-all"
            title="Cara Bermain"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Panel Guru Button with Lock Protection */}
          <button
            onClick={onOpenTeacherPanel}
            className="flex items-center gap-1.5 bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border-b-4 border-indigo-800 active:translate-y-0.5 active:border-b-2 shadow-sm transition-all"
            title="Panel Editor Guru & Orang Tua (Dilindungi Sandi)"
          >
            <GraduationCap className="w-4 h-4 sm:w-4 sm:h-4 text-indigo-100" />
            <span className="hidden sm:inline">Panel Guru</span>
            <span className="sm:hidden">Guru</span>
            <Lock className="w-3 h-3 text-indigo-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
