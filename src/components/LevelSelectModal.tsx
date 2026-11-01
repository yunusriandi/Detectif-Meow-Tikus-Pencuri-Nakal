/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Lock, Star, Play, CheckCircle2, MapPin, Award, Filter, Sparkles } from 'lucide-react';
import { WordItem, PlayerStats } from '../types/game';
import { playClickSfx } from '../utils/audio';

interface LevelSelectModalProps {
  words: WordItem[];
  currentLevelIndex: number;
  stats: PlayerStats;
  onSelectLevel: (index: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  words,
  currentLevelIndex,
  stats,
  onSelectLevel,
  onClose,
}) => {
  const highestUnlocked = Math.max(stats.unlockedLevel, 0);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'ZONA1' | 'ZONA2' | 'ZONA3' | 'ZONA4' | 'CUSTOM'>('ALL');

  // Helper for star rating per level
  const getStarsForLevel = (idx: number): number => {
    if (stats.levelStars && stats.levelStars[idx] !== undefined) {
      return stats.levelStars[idx];
    }
    const word = words[idx];
    if (word && stats.solvedWordIds.includes(word.id)) {
      return 3;
    }
    return 0;
  };

  const handleLevelClick = (idx: number) => {
    if (idx <= highestUnlocked) {
      playClickSfx();
      onSelectLevel(idx);
      onClose();
    }
  };

  // Filter words
  const filteredIndices = words.map((_, i) => i).filter((idx) => {
    const word = words[idx];
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'CUSTOM') return word.isCustom;
    if (selectedFilter === 'ZONA1') return idx < 8 && !word.isCustom;
    if (selectedFilter === 'ZONA2') return idx >= 8 && idx < 16 && !word.isCustom;
    if (selectedFilter === 'ZONA3') return idx >= 16 && idx < 24 && !word.isCustom;
    if (selectedFilter === 'ZONA4') return idx >= 24 && !word.isCustom;
    return true;
  });

  const getDifficultyBadge = (word: WordItem, idx: number) => {
    if (word.isCustom) {
      return { label: 'Soal Guru', color: 'bg-purple-100 text-purple-900 border-purple-300' };
    }
    if (idx < 8) {
      return { label: '1 Huruf (Pemula)', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    }
    if (idx < 16) {
      return { label: '1-2 Huruf (Cilik)', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    if (idx < 24) {
      return { label: '2 Huruf (Handal)', color: 'bg-orange-100 text-orange-900 border-orange-300' };
    }
    return { label: '3 Huruf (Master)', color: 'bg-rose-100 text-rose-900 border-rose-300' };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-400 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 sm:px-6 py-4 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              🗺️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black leading-tight drop-shadow-xs">
                Peta Petualangan Detektif Meow
              </h2>
              <p className="text-xs text-amber-100 font-semibold">
                32 Level Berjenjang: Pemula ➔ Cilik ➔ Handal ➔ Master
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Summary Bar */}
        <div className="bg-amber-100/90 border-b border-amber-300 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-amber-950">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>
              Progres Terbuka: <strong className="text-amber-900">{Math.min(highestUnlocked + 1, words.length)}</strong> / {words.length} Level
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>{stats.stars} Bintang</span>
            </div>
          </div>
        </div>

        {/* Zone Filter Tabs */}
        <div className="bg-white border-b border-amber-200 px-3 sm:px-6 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-bold">
          <span className="text-amber-900 shrink-0 mr-1 hidden sm:inline">Pilih Zona:</span>
          <button
            onClick={() => { playClickSfx(); setSelectedFilter('ALL'); }}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === 'ALL'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100'
            }`}
          >
            Semua ({words.length})
          </button>
          <button
            onClick={() => { playClickSfx(); setSelectedFilter('ZONA1'); }}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === 'ZONA1'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-900 hover:bg-emerald-50'
            }`}
          >
            🟢 Zona 1: Pemula (1–8)
          </button>
          <button
            onClick={() => { playClickSfx(); setSelectedFilter('ZONA2'); }}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === 'ZONA2'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-50'
            }`}
          >
            🟡 Zona 2: Cilik (9–16)
          </button>
          <button
            onClick={() => { playClickSfx(); setSelectedFilter('ZONA3'); }}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === 'ZONA3'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-900 hover:bg-orange-50'
            }`}
          >
            🟠 Zona 3: Handal (17–24)
          </button>
          <button
            onClick={() => { playClickSfx(); setSelectedFilter('ZONA4'); }}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === 'ZONA4'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-900 hover:bg-rose-50'
            }`}
          >
            🟣 Zona 4: Master (25–32)
          </button>
        </div>

        {/* Level Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {filteredIndices.map((idx) => {
              const word = words[idx];
              const levelNum = idx + 1;
              const isUnlocked = idx <= highestUnlocked;
              const isCurrent = idx === currentLevelIndex;
              const stars = getStarsForLevel(idx);
              const isCompleted = stars > 0;
              const badge = getDifficultyBadge(word, idx);

              return (
                <button
                  key={word.id || `lvl-${idx}`}
                  disabled={!isUnlocked}
                  onClick={() => handleLevelClick(idx)}
                  className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-between min-h-[135px] transition-all relative select-none ${
                    isCurrent
                      ? 'bg-amber-300 border-amber-600 shadow-lg ring-4 ring-yellow-300 transform -translate-y-1'
                      : isUnlocked
                      ? 'bg-white hover:bg-amber-50 border-amber-300 hover:border-amber-500 shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                      : 'bg-slate-100 border-slate-300 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Top: Category & Level Number */}
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="font-black text-amber-950">
                      Level {levelNum}
                    </span>
                    <span className="text-base">{word.categoryIcon}</span>
                  </div>

                  {/* Difficulty Tag */}
                  <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border mt-0.5 ${badge.color}`}>
                    {badge.label}
                  </div>

                  {/* Center Mascot / Status Icon */}
                  <div className="my-1 flex flex-col items-center justify-center">
                    {isCurrent ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>Sedang Main</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 font-bold text-xs">
                        🐾
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Word Preview Hint / Cloze */}
                  <div className="font-mono text-xs font-bold text-slate-700 tracking-wider">
                    {isUnlocked
                      ? word.word
                          .split('')
                          .map((c, i) => (word.hiddenIndices.includes(i) ? '_' : c))
                          .join(' ')
                      : '• • • •'}
                  </div>

                  {/* Bottom: Stars Earned */}
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3].map((starNum) => (
                      <Star
                        key={starNum}
                        className={`w-3.5 h-3.5 ${
                          starNum <= stars
                            ? 'text-yellow-500 fill-yellow-400'
                            : 'text-slate-300 fill-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-amber-100/90 border-t border-amber-300 flex items-center justify-between text-xs">
          <span className="text-amber-900 font-medium hidden sm:inline">
            🐾 Selesaikan level untuk membuka zona berikutnya tanpa ada pengulangan soal!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl active:scale-95 ml-auto cursor-pointer"
          >
            Kembali ke Game
          </button>
        </div>
      </div>
    </div>
  );
};
