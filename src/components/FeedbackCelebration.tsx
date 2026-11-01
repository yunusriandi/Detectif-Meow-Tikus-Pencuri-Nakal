/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Key, Volume2, Map, Trophy, Pause, Play, Heart, ThumbsUp } from 'lucide-react';
import { WordItem } from '../types/game';
import { DetectiveMeowSvg } from './DetectiveMeowSvg';
import { TikusNakalSvg } from './TikusNakalSvg';
import { TreasureChestSvg } from './TreasureChestSvg';

interface FeedbackCelebrationProps {
  word: WordItem;
  currentLevelNumber: number;
  totalLevels: number;
  onNextWord: () => void;
  onOpenLevelMap: () => void;
  onPronounceWord: () => void;
}

const APPRECIATIONS = [
  {
    title: 'Luar Biasa, Detektif Hebat! 🌟',
    badge: 'Penyelidikan Sempurna',
    quote: 'Kamu teliti sekali menemukan huruf yang dicuri Tikus Nakal!',
    color: 'from-amber-400 to-amber-600',
  },
  {
    title: 'Pintar Sekali! 🐱',
    badge: 'Mata Detektif Tajam',
    quote: 'Detektif Meow sangat bangga dengan kecerdasanmu!',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    title: 'Kerja Bagus, Bintang Detektif! ✨',
    badge: 'Jagoan Literasi',
    quote: 'Tikus Nakal menyerah dan mengembalikan kunci emasnya!',
    color: 'from-sky-400 to-sky-600',
  },
  {
    title: 'Hebat, Kamu Makin Mahir Membaca! 📚',
    badge: 'Langkah Cerdas',
    quote: 'Setiap huruf berhasil kamu susun dengan tepat dan cepat!',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    title: 'Detektif Cilik Juara! 🏆',
    badge: 'Pemberantas Jejak',
    quote: 'Peti rahasia terbuka lebar dan hartanya terselamatkan!',
    color: 'from-orange-400 to-orange-600',
  },
];

export const FeedbackCelebration: React.FC<FeedbackCelebrationProps> = ({
  word,
  currentLevelNumber,
  totalLevels,
  onNextWord,
  onOpenLevelMap,
  onPronounceWord,
}) => {
  const isLastLevel = currentLevelNumber >= totalLevels;

  // Selected appreciation message
  const appreciation = useMemo(() => {
    return APPRECIATIONS[(currentLevelNumber - 1) % APPRECIATIONS.length];
  }, [currentLevelNumber]);

  // Jeda timer state (5 seconds friendly buffer)
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Confetti effect on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#FBBF24', '#8B5CF6'],
      });
    } catch {
      // ignore
    }
  }, []);

  // Countdown timer for relaxed pause
  useEffect(() => {
    if (isLastLevel) return;

    if (!isPaused && secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isPaused && secondsLeft === 0) {
      // Timer finished, transition to next level automatically
      onNextWord();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsLeft, isPaused, isLastLevel, onNextWord]);

  // Toggle pause timer
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-amber-50 via-orange-50/50 to-amber-100 border-4 border-amber-400 rounded-3xl max-w-lg w-full p-5 sm:p-7 text-center shadow-2xl relative overflow-hidden">
        {/* Background sparkles */}
        <div className="absolute top-2 left-3 text-2xl animate-spin text-amber-400 select-none">✨</div>
        <div className="absolute top-4 right-4 text-2xl animate-bounce text-yellow-400 select-none">⭐</div>

        {/* Mascot & Chest Duo */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-1">
          <DetectiveMeowSvg mood="celebrating" size={115} className="sm:scale-110" />
          <TreasureChestSvg status="opened" size={115} className="sm:scale-110 animate-chest-bounce" />
          <TikusNakalSvg mood="surprised" size={95} className="hidden sm:inline-flex" />
        </div>

        {/* Appreciation Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 border border-amber-400 rounded-full text-xs font-black text-amber-950 uppercase tracking-wider mb-1.5 shadow-xs">
          <ThumbsUp className="w-3.5 h-3.5 text-amber-800" />
          <span>{appreciation.badge} · Level {currentLevelNumber} Selesai</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1 mb-1 leading-tight">
          {isLastLevel ? 'Semua Kasus Terpecahkan! 🏆' : appreciation.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-amber-800 mb-3 px-2">
          "{isLastLevel ? 'Selamat! Kamu telah menamatkan seluruh petualangan Detektif Meow!' : appreciation.quote}"
        </p>

        {/* Revealed Full Word Showcase */}
        <div className="bg-white/90 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 mb-3 shadow-inner">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl sm:text-3xl">{word.categoryIcon}</span>
            <span className="text-3xl sm:text-5xl font-black text-amber-950 tracking-wider">
              {word.word}
            </span>
            <button
              onClick={onPronounceWord}
              className="p-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-full active:scale-90 transition-all shadow-xs cursor-pointer"
              title="Dengarkan Pelafalan Kata"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            "{word.clue}"
          </p>
        </div>

        {/* Reward Badges Earned */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-200 border border-yellow-400 rounded-xl font-extrabold text-amber-950 text-xs sm:text-sm shadow-xs">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-400" />
            <span>+3 Bintang</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-200 border border-amber-400 rounded-xl font-extrabold text-amber-950 text-xs sm:text-sm shadow-xs">
            <Key className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
            <span>+1 Kunci Emas</span>
          </div>
        </div>

        {/* Jeda Santai Menuju Level Berikutnya (Calming Pause / Countdown Indicator) */}
        {!isLastLevel ? (
          <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-3 mb-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs font-extrabold text-amber-950 mb-1.5 px-1">
              <span className="flex items-center gap-1">
                <span>⏱️ Jeda Santai Menuju Level {currentLevelNumber + 1}:</span>
              </span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-sm bg-white px-2 py-0.5 rounded-lg border border-amber-300">
                  {secondsLeft}s
                </span>
                <button
                  onClick={handleTogglePause}
                  className="px-2 py-0.5 bg-white hover:bg-amber-50 border border-amber-300 rounded-lg text-amber-900 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer active:scale-95"
                  title={isPaused ? 'Lanjutkan Hitungan' : 'Tahan Jeda'}
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-amber-700" />}
                  <span>{isPaused ? 'Lanjutkan' : 'Tahan'}</span>
                </button>
              </div>
            </div>

            {/* Visual Progress Bar for the 5-second pause */}
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-amber-300">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(secondsLeft / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-amber-800 mt-1 font-medium">
              {isPaused
                ? '⏸️ Jeda ditahan. Klik "Lanjut Sekarang" bila siap!'
                : `Level berikutnya akan dimulai otomatis dalam ${secondsLeft} detik...`}
            </p>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {!isLastLevel ? (
            <button
              onClick={onNextWord}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-base sm:text-lg rounded-2xl border-b-6 border-emerald-800 active:border-b-2 active:translate-y-1 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Lanjut Sekarang ke Level {currentLevelNumber + 1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onOpenLevelMap}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base sm:text-lg rounded-2xl border-b-6 border-amber-800 active:border-b-2 active:translate-y-1 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Trophy className="w-5 h-5 text-yellow-200" />
              <span>Lihat Peta Semua Level Juara</span>
            </button>
          )}

          <button
            onClick={onOpenLevelMap}
            className="w-full py-2.5 px-4 bg-white hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm rounded-xl border border-amber-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Map className="w-4 h-4 text-amber-700" />
            <span>Istirahat & Buka Peta Level</span>
          </button>
        </div>
      </div>
    </div>
  );
};
