/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, Trash2, Play, Download, Upload, Check, AlertCircle, Sparkles, BookOpen, ShieldCheck, KeyRound, Lock, RefreshCw, Key } from 'lucide-react';
import { WordItem, GameMode } from '../types/game';
import { saveCustomWords, saveGameMode, getTeacherPassword, setTeacherPassword } from '../utils/storage';

interface TeacherEditorModalProps {
  customWords: WordItem[];
  onUpdateCustomWords: (words: WordItem[]) => void;
  gameMode: GameMode;
  onUpdateGameMode: (mode: GameMode) => void;
  onPlaySpecificWord: (word: WordItem) => void;
  onClose: () => void;
}

const CATEGORY_PRESETS = [
  { name: 'Sekolah', icon: '📚' },
  { name: 'Hewan', icon: '🐱' },
  { name: 'Buah', icon: '🍎' },
  { name: 'Alam', icon: '🌳' },
  { name: 'Makanan', icon: '🍞' },
  { name: 'Mainan', icon: '⚽' },
  { name: 'Tubuh', icon: '👀' },
  { name: 'Benda', icon: '📦' },
  { name: 'Keluarga', icon: '👨‍👩‍👧' },
];

export const TeacherEditorModal: React.FC<TeacherEditorModalProps> = ({
  customWords,
  onUpdateCustomWords,
  gameMode,
  onUpdateGameMode,
  onPlaySpecificWord,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'security'>('create');

  // Security / PIN change state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeError, setPinChangeError] = useState<string | null>(null);
  const [pinChangeSuccess, setPinChangeSuccess] = useState<string | null>(null);

  // Form State
  const [inputWord, setInputWord] = useState('');
  const [selectedHiddenIndices, setSelectedHiddenIndices] = useState<number[]>([]);
  const [inputClue, setInputClue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_PRESETS[0]);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Clean word string (uppercase, letters only)
  const handleWordInputChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 10);
    setInputWord(cleaned);
    // Auto reset hidden indices if word length changed
    setSelectedHiddenIndices([]);
    setFormError(null);
  };

  const toggleHiddenIndex = (index: number) => {
    setFormError(null);
    if (selectedHiddenIndices.includes(index)) {
      setSelectedHiddenIndices(selectedHiddenIndices.filter((i) => i !== index));
    } else {
      setSelectedHiddenIndices([...selectedHiddenIndices, index].sort((a, b) => a - b));
    }
  };

  const handleSaveWord = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const clean = inputWord.trim().toUpperCase();
    if (clean.length < 3) {
      setFormError('Kata minimal terdiri dari 3 huruf.');
      return;
    }
    if (selectedHiddenIndices.length === 0) {
      setFormError('Pilih minimal 1 huruf yang akan disembunyikan (rahasia).');
      return;
    }
    if (selectedHiddenIndices.length === clean.length) {
      setFormError('Jangan sembunyikan semua huruf. Sisakan minimal 1 huruf petunjuk.');
      return;
    }
    if (!inputClue.trim()) {
      setFormError('Silakan masukkan petunjuk teks untuk anak-anak.');
      return;
    }

    // Auto-generate some suitable distractors (vowels and common consonants)
    const allAlphabet = 'AIUEOBDMNPSTRKG';
    const cleanSet = new Set(clean.split(''));
    const generatedDistractors = allAlphabet
      .split('')
      .filter((l) => !cleanSet.has(l))
      .slice(0, 3);

    const newWordItem: WordItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      word: clean,
      hiddenIndices: selectedHiddenIndices,
      clue: inputClue.trim(),
      category: selectedCategory.name,
      categoryIcon: selectedCategory.icon,
      distractors: generatedDistractors,
      isCustom: true,
      createdAt: Date.now(),
    };

    const updated = [newWordItem, ...customWords];
    onUpdateCustomWords(updated);
    saveCustomWords(updated);

    setFormSuccess(`Kata "${clean}" berhasil disimpan ke bank soal!`);
    setInputWord('');
    setSelectedHiddenIndices([]);
    setInputClue('');

    // If game mode is DEFAULT_ONLY, suggest or switch to ALL so teacher sees their word
    if (gameMode === 'DEFAULT_ONLY') {
      onUpdateGameMode('ALL');
      saveGameMode('ALL');
    }
  };

  const handleDeleteWord = (id: string) => {
    const updated = customWords.filter((w) => w.id !== id);
    onUpdateCustomWords(updated);
    saveCustomWords(updated);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customWords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `soal_detektif_meow_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            // merge
            const merged = [...parsed, ...customWords];
            // deduplicate by id
            const uniqueMap = new Map<string, WordItem>();
            merged.forEach((item) => uniqueMap.set(item.id, item));
            const uniqueList = Array.from(uniqueMap.values());
            onUpdateCustomWords(uniqueList);
            saveCustomWords(uniqueList);
            alert(`Berhasil mengimpor ${parsed.length} kata!`);
          }
        } catch {
          alert('Format file JSON tidak sesuai.');
        }
      };
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeError(null);
    setPinChangeSuccess(null);

    const storedPin = getTeacherPassword();
    if (currentPinInput.trim().toUpperCase() !== storedPin.trim().toUpperCase()) {
      setPinChangeError('Kata sandi lama yang Anda masukkan tidak sesuai.');
      return;
    }

    if (newPinInput.trim().length < 4) {
      setPinChangeError('Kata sandi baru minimal 4 karakter/angka.');
      return;
    }

    if (newPinInput.trim() !== confirmPinInput.trim()) {
      setPinChangeError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setTeacherPassword(newPinInput.trim());
    setPinChangeSuccess('Kata sandi guru berhasil diperbarui!');
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border-4 border-indigo-400 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                Panel Editor Guru & Orang Tua
              </h2>
              <p className="text-xs text-indigo-100">
                Buat dan kelola kata rumpang kustom untuk murid SD Fase A
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

        {/* Mode Selector Bar */}
        <div className="bg-indigo-50 border-b border-indigo-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-indigo-950">Mode Soal Aktif:</span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-indigo-200 text-xs">
            <button
              onClick={() => {
                onUpdateGameMode('ALL');
                saveGameMode('ALL');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                gameMode === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              Mode Gabungan
            </button>
            <button
              onClick={() => {
                onUpdateGameMode('CUSTOM_ONLY');
                saveGameMode('CUSTOM_ONLY');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                gameMode === 'CUSTOM_ONLY'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              Khusus Soal Guru ({customWords.length})
            </button>
            <button
              onClick={() => {
                onUpdateGameMode('DEFAULT_ONLY');
                saveGameMode('DEFAULT_ONLY');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                gameMode === 'DEFAULT_ONLY'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              Soal Bawaan
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-4 font-bold text-sm border-b-3 transition-colors flex items-center gap-2 ${
              activeTab === 'create'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Buat Kata Baru</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-4 font-bold text-sm border-b-3 transition-colors flex items-center gap-2 ${
              activeTab === 'list'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Daftar Soal Guru ({customWords.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-4 font-bold text-sm border-b-3 transition-colors flex items-center gap-2 ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Keamanan & Lisensi Pro</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'create' && (
            <form onSubmit={handleSaveWord} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Step 1: Input Word */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  1. Masukkan Kata Utuh (3 - 10 Huruf):
                </label>
                <input
                  type="text"
                  value={inputWord}
                  onChange={(e) => handleWordInputChange(e.target.value)}
                  placeholder="Contoh: SEKOLAH, JERUK, MATAHARI"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none font-bold text-base uppercase tracking-wider text-slate-900"
                />
              </div>

              {/* Step 2: Interactive Letter Selector */}
              {inputWord.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="text-xs sm:text-sm font-bold text-amber-950 mb-1.5 flex items-center justify-between">
                    <span>2. Tentukan Huruf yang Disembunyikan Tikus:</span>
                    <span className="text-[11px] text-amber-700 font-medium">
                      (Klik huruf untuk ubah jadi rahasia)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center py-2">
                    {inputWord.split('').map((char, idx) => {
                      const isHidden = selectedHiddenIndices.includes(idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleHiddenIndex(idx)}
                          className={`w-11 h-13 sm:w-13 sm:h-15 rounded-xl font-black text-xl sm:text-2xl transition-all cursor-pointer flex flex-col items-center justify-center select-none active:scale-95 ${
                            isHidden
                              ? 'bg-amber-400 border-2 border-amber-600 text-amber-950 shadow-md ring-2 ring-yellow-400'
                              : 'bg-white border-2 border-slate-300 text-slate-800 hover:border-amber-400'
                          }`}
                        >
                          <span>{isHidden ? '?' : char}</span>
                          <span className="text-[9px] font-bold text-amber-800">
                            {isHidden ? 'Rahasia' : char}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-center text-xs text-amber-900 font-bold mt-1">
                    Pratinjau Kata Murid:{' '}
                    <span className="font-mono text-sm tracking-widest text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                      {inputWord
                        .split('')
                        .map((c, i) => (selectedHiddenIndices.includes(i) ? '_' : c))
                        .join(' ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Input Clue */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  3. Masukkan Petunjuk Teks (Clue Ramah Anak):
                </label>
                <textarea
                  value={inputClue}
                  onChange={(e) => setInputClue(e.target.value)}
                  placeholder="Contoh: Tempat kita menuntut ilmu dan membaca buku bersama teman"
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none font-medium text-sm text-slate-900 resize-none"
                />
              </div>

              {/* Step 4: Category Preset */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  4. Pilih Kategori & Ikon:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {CATEGORY_PRESETS.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-2 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        selectedCategory.name === cat.name
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base rounded-xl border-b-4 border-indigo-900 active:border-b-1 active:translate-y-1 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simpan Kata ke Bank Soal</span>
              </button>
            </form>
          )}

          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Top Action Bar for List */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  Total Soal Buatan Guru: {customWords.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJson}
                    disabled={customWords.length === 0}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 disabled:opacity-40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor JSON</span>
                  </button>

                  <label className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Impor JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* List Cards */}
              {customWords.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <div className="text-4xl mb-2">📝</div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Belum ada soal kustom buatan guru
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Klik tab "Buat Kata Baru" untuk menambahkan kosakata materi yang sedang diajarkan di kelas!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {customWords.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl flex items-center justify-between gap-3 shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.categoryIcon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-base text-slate-900 tracking-wide">
                              {item.word}
                            </span>
                            <span className="font-mono text-xs px-2 py-0.5 bg-amber-100 border border-amber-300 rounded-md text-amber-900">
                              {item.word
                                .split('')
                                .map((c, i) => (item.hiddenIndices.includes(i) ? '_' : c))
                                .join(' ')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                            "{item.clue}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onPlaySpecificWord(item);
                            onClose();
                          }}
                          className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95"
                          title="Coba Mainkan Soal Ini"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Uji Coba</span>
                        </button>
                        <button
                          onClick={() => handleDeleteWord(item.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl active:scale-95"
                          title="Hapus Soal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              {/* Commercial Pro License Showcase */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                      PRO
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-indigo-950">
                        Lisensi Pendidik Pro (Siap Jual & Lisensi Sekolah)
                      </h4>
                      <p className="text-[11px] text-indigo-700 font-medium">
                        Modul komersial untuk guru, lembaga bimbel, dan sekolah dasar
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-full">
                    ✓ Lisensi Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-900 font-medium pt-2 border-t border-indigo-100">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Proteksi Sandi Masuk (Siswa Tidak Bisa Mengubah)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unlimited Custom Kata & Clue Edukasi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ekspor & Impor Paket Soal JSON Antar Guru</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dukungan Siap Bungkus ke APK Android / Smart TV</span>
                  </div>
                </div>
              </div>

              {/* Change Password Form */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Ubah Kata Sandi / PIN Panel Guru
                  </h4>
                </div>

                {pinChangeError && (
                  <div className="mb-3 p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{pinChangeError}</span>
                  </div>
                )}

                {pinChangeSuccess && (
                  <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pinChangeSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleChangePin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kata Sandi Saat Ini:
                    </label>
                    <input
                      type="password"
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Masukkan sandi lama (Bawaan: GURU123)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-xs sm:text-sm font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Kata Sandi Baru:
                      </label>
                      <input
                        type="password"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        placeholder="Minimal 4 karakter"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-xs sm:text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Konfirmasi Sandi Baru:
                      </label>
                      <input
                        type="password"
                        value={confirmPinInput}
                        onChange={(e) => setConfirmPinInput(e.target.value)}
                        placeholder="Ulangi sandi baru"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-xs sm:text-sm font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-xs"
                  >
                    Simpan Kata Sandi Baru
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl active:scale-95"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
