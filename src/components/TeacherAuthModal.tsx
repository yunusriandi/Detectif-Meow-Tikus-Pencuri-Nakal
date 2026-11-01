/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { verifyTeacherPassword, DEFAULT_TEACHER_PIN } from '../utils/storage';
import { playClickSfx, playIncorrectSfx, playSuccessFanfare } from '../utils/audio';

interface TeacherAuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  onSuccess,
  onClose,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setErrorMessage('Masukkan kata sandi guru terlebih dahulu.');
      return;
    }

    if (verifyTeacherPassword(pinInput)) {
      playSuccessFanfare();
      onSuccess();
    } else {
      playIncorrectSfx();
      setErrorMessage('Kata sandi salah! Periksa kembali atau gunakan sandi bawaan.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleKeypadPress = (val: string) => {
    playClickSfx();
    setErrorMessage(null);
    setPinInput((prev) => (prev.length < 12 ? prev + val : prev));
  };

  const handleBackspace = () => {
    playClickSfx();
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playClickSfx();
    setPinInput('');
    setErrorMessage(null);
  };

  const fillDefaultPin = () => {
    playClickSfx();
    setPinInput(DEFAULT_TEACHER_PIN);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-white border-4 border-indigo-400 rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-transform ${
          isShaking ? 'animate-wiggle-playful' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon & Pro Badge Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center text-indigo-600 mb-2 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-900 mb-1.5">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Fitur Khusus Pendidik & Lisensi Pro</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            Verifikasi Sandi Guru
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xs">
            Area ini diproteksi agar siswa tidak sengaja mengubah bank soal kurikulum dan kunci jawaban.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Masukkan Sandi / PIN Guru"
              className="w-full pl-11 pr-11 py-3 bg-slate-50 border-2 border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-2xl outline-none font-bold text-base sm:text-lg tracking-wider text-slate-900 transition-all text-center"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Quick Helper Default PIN for Teacher */}
          <div className="flex items-center justify-between text-xs bg-indigo-50/80 border border-indigo-200 rounded-xl px-3 py-2 text-indigo-950 font-medium">
            <span>Sandi Standar: <strong>{DEFAULT_TEACHER_PIN}</strong></span>
            <button
              type="button"
              onClick={fillDefaultPin}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline active:scale-95"
            >
              Gunakan Sandi Ini
            </button>
          </div>

          {/* Touch Number Keypad (Ideal for Smart TV & Tablet / Mobile) */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (item === 'C') handleClear();
                  else if (item === '⌫') handleBackspace();
                  else handleKeypadPress(item);
                }}
                className={`py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base border transition-all active:scale-95 cursor-pointer ${
                  item === 'C'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    : item === '⌫'
                    ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-xs'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-base rounded-2xl border-b-4 border-indigo-900 active:border-b-2 active:translate-y-0.5 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-indigo-200" />
            <span>Buka Panel Guru</span>
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500 mt-4">
          💡 Sandi dapat diubah kapan saja di dalam menu Pengaturan Panel Guru.
        </p>
      </div>
    </div>
  );
};
