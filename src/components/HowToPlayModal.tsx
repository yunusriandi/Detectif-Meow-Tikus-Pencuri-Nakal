/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Volume2, Key, Star } from 'lucide-react';
import { DetectiveMeowSvg } from './DetectiveMeowSvg';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-400 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <DetectiveMeowSvg mood="idle" size={70} />
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950">
              Cara Bermain Detektif Meow
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-800">
              Misi: Temukan huruf yang dicuri Tikus Nakal!
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-amber-950 font-medium">
          <div className="flex items-start gap-3 bg-white/80 p-3 rounded-2xl border border-amber-200">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              1
            </span>
            <p>
              <strong>Baca atau dengarkan petunjuk:</strong> Tekan tombol <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-200 rounded text-amber-900 font-bold"><Volume2 className="w-3 h-3" /> Dengarkan</span> untuk mendengar suara petunjuk kata.
            </p>
          </div>

          <div className="flex items-start gap-3 bg-white/80 p-3 rounded-2xl border border-amber-200">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              2
            </span>
            <p>
              <strong>Isi kotak rahasia:</strong> Ketuk atau geser huruf dari kotak bawah ke kotak berlogo kaca pembesar (🔍).
            </p>
          </div>

          <div className="flex items-start gap-3 bg-white/80 p-3 rounded-2xl border border-amber-200">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              3
            </span>
            <p>
              <strong>Buka Peti Harta:</strong> Jika tebakan benar, peti akan terbuka dan kamu mendapatkan <Star className="inline w-3.5 h-3.5 text-yellow-500 fill-yellow-400" /> Bintang dan <Key className="inline w-3.5 h-3.5 text-amber-600" /> Kunci Emas!
            </p>
          </div>

          <div className="flex items-start gap-3 bg-indigo-50 p-3 rounded-2xl border border-indigo-200 text-indigo-950">
            <span className="text-lg">🎓</span>
            <p className="text-xs">
              <strong>Untuk Guru & Orang Tua:</strong> Klik tombol <strong>Panel Guru</strong> di pojok kanan atas untuk menambah kata materi kurikulum kelas tanpa batas!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl border-b-4 border-amber-700 active:border-b-1 active:translate-y-1 shadow-md transition-all"
        >
          Siap Menyelidiki, Meow! 🐾
        </button>
      </div>
    </div>
  );
};
