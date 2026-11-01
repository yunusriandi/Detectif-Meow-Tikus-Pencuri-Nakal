/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Sparkles, Volume2, RotateCcw, ArrowRight, BookOpen, GraduationCap, Compass, ShieldAlert, Map, Lock } from 'lucide-react';
import { WordItem, GameMode, PlayerStats, LetterTile } from './types/game';
import { DEFAULT_WORDS } from './data/defaultWords';
import {
  loadCustomWords,
  saveCustomWords,
  loadPlayerStats,
  savePlayerStats,
  loadGameMode,
  saveGameMode,
  loadSoundMuted,
  saveSoundMuted,
  getActiveWordPool,
} from './utils/storage';
import {
  playLetterPlaceSfx,
  playLetterRemoveSfx,
  playSuccessFanfare,
  playChestOpenSfx,
  playIncorrectSfx,
  playClickSfx,
  speakIndonesian,
  setSoundMuted,
  isSoundMuted,
} from './utils/audio';

import { DetectiveMeowSvg } from './components/DetectiveMeowSvg';
import { TikusNakalSvg } from './components/TikusNakalSvg';
import { TreasureChestSvg } from './components/TreasureChestSvg';
import { GameHeader } from './components/GameHeader';
import { WordPlayArea } from './components/WordPlayArea';
import { LetterBank } from './components/LetterBank';
import { FeedbackCelebration } from './components/FeedbackCelebration';
import { TeacherEditorModal } from './components/TeacherEditorModal';
import { TeacherAuthModal } from './components/TeacherAuthModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { HowToPlayModal } from './components/HowToPlayModal';

export default function App() {
  // Game view state: 'MENU' | 'PLAYING'
  const [viewState, setViewState] = useState<'MENU' | 'PLAYING'>('MENU');

  // Persistence State
  const [customWords, setCustomWords] = useState<WordItem[]>(() => loadCustomWords());
  const [gameMode, setGameMode] = useState<GameMode>(() => loadGameMode());
  const [stats, setStats] = useState<PlayerStats>(() => loadPlayerStats());
  const [isMuted, setIsMutedState] = useState<boolean>(() => loadSoundMuted());

  // Active word pool
  const wordPool = useMemo(() => {
    return getActiveWordPool(gameMode, customWords);
  }, [gameMode, customWords]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Current active word
  const currentWord: WordItem = useMemo(() => {
    if (wordPool.length === 0) return DEFAULT_WORDS[0];
    const safeIdx = Math.min(Math.max(0, currentWordIndex), wordPool.length - 1);
    return wordPool[safeIdx];
  }, [wordPool, currentWordIndex]);

  // Letters placed in slots: { [slotIndex]: { letter: string, bankId: string } }
  const [placedLetters, setPlacedLetters] = useState<{ [slotIndex: number]: { letter: string; bankId: string } }>({});

  // Letter bank tiles
  const [letterBankTiles, setLetterBankTiles] = useState<LetterTile[]>([]);

  // Mascots Mood and Dialogue
  const [meowMood, setMeowMood] = useState<'idle' | 'thinking' | 'celebrating' | 'encouraging'>('idle');
  const [tikusMood, setTikusMood] = useState<'sneaky' | 'giggling' | 'surprised'>('sneaky');
  const [dialogueBubble, setDialogueBubble] = useState<string>('Ayo cari jejak huruf yang dicuri Tikus Nakal, Meow!');

  // Modals & Effects
  const [isSolved, setIsSolved] = useState(false);
  const [isShakeError, setIsShakeError] = useState(false);
  const [highlightSlotIndex, setHighlightSlotIndex] = useState<number | null>(null);
  const [hintLetter, setHintLetter] = useState<string | null>(null);
  const [isTeacherAuthOpen, setIsTeacherAuthOpen] = useState(false);
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
  const [isLevelMapOpen, setIsLevelMapOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Sync mute with audio utility
  useEffect(() => {
    setSoundMuted(isMuted);
  }, [isMuted]);

  // Setup letter bank whenever current word changes
  const initializeWordTiles = useCallback((word: WordItem) => {
    setPlacedLetters({});
    setHighlightSlotIndex(null);
    setHintLetter(null);
    setMeowMood('idle');
    setTikusMood('sneaky');
    setDialogueBubble(`Petunjuk: "${word.clue}"`);

    // Target hidden letters
    const targetLetters = word.hiddenIndices.map((idx) => word.word[idx]);

    // Distractors
    const distractors = word.distractors && word.distractors.length > 0
      ? word.distractors
      : ['A', 'E', 'O', 'B', 'M', 'K'];

    // Distractor count based on difficulty
    const diff = word.difficulty || 'MUDAH';
    const distractorCount = diff === 'MUDAH' ? 2 : diff === 'SEDANG' ? 3 : diff === 'SULIT' ? 3 : 4;

    // Combine target letters and tailored distractors
    const combined = [...targetLetters];
    for (let i = 0; i < distractorCount; i++) {
      const distractor = distractors[i % distractors.length];
      combined.push(distractor);
    }

    // Shuffle the combined letters using Fisher-Yates
    const shuffled = [...combined];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const tiles: LetterTile[] = shuffled.map((char, i) => ({
      id: `tile-${i}-${char}-${Math.random().toString(36).substring(2, 6)}`,
      letter: char,
      isUsed: false,
    }));

    setLetterBankTiles(tiles);
  }, []);

  // When word changes, reinitialize
  useEffect(() => {
    if (currentWord) {
      initializeWordTiles(currentWord);
    }
  }, [currentWord, initializeWordTiles]);

  // Toggle Mute
  const handleToggleMute = () => {
    playClickSfx();
    const next = !isMuted;
    setIsMutedState(next);
    saveSoundMuted(next);
  };

  // Play Indonesian Clue Audio
  const handlePlayClueAudio = () => {
    playClickSfx();
    speakIndonesian(`Petunjuk kata: ${currentWord.clue}`);
  };

  // Reset placed letters back to bank
  const handleResetSlots = () => {
    playLetterRemoveSfx();
    setPlacedLetters({});
    setLetterBankTiles((prev) => prev.map((t) => ({ ...t, isUsed: false })));
    setMeowMood('idle');
    setTikusMood('sneaky');
  };

  // Check Solution
  const checkWordCompletion = (currentPlaced: { [slotIndex: number]: { letter: string; bankId: string } }) => {
    const hiddenIndices = currentWord.hiddenIndices;
    const allFilled = hiddenIndices.every((idx) => currentPlaced[idx] !== undefined);

    if (!allFilled) return;

    // Check correctness
    const isAllCorrect = hiddenIndices.every(
      (idx) => currentPlaced[idx].letter === currentWord.word[idx]
    );

    if (isAllCorrect) {
      // SUCCESS!
      playSuccessFanfare();
      playChestOpenSfx();
      setMeowMood('celebrating');
      setTikusMood('surprised');
      setDialogueBubble('Penyelidikan Berhasil! Luar biasa, Detektif Meow!');

      // Save stats & unlock next level
      const nextUnlocked = Math.max(stats.unlockedLevel, currentWordIndex + 1);
      const updatedStars = {
        ...(stats.levelStars || {}),
        [currentWordIndex]: 3,
      };

      const newStats: PlayerStats = {
        stars: stats.stars + 1,
        keys: stats.keys + 1,
        solvedWordIds: Array.from(new Set([...stats.solvedWordIds, currentWord.id])),
        totalChestsOpened: stats.totalChestsOpened + 1,
        unlockedLevel: nextUnlocked,
        levelStars: updatedStars,
      };
      setStats(newStats);
      savePlayerStats(newStats);

      // Dynamic warm praise for Indonesian voice
      const praises = [
        'Luar biasa, Detektif Hebat!',
        'Pintar sekali!',
        'Kerja bagus, Detektif Cilik!',
        'Hebat, penyelidikan berhasil!',
        'Detektif Juara, kamu luar biasa!',
      ];
      const selectedPraise = praises[currentWordIndex % praises.length];
      speakIndonesian(`${selectedPraise} Kata yang terungkap adalah ${currentWord.word}!`);

      // Trigger celebration modal
      setIsSolved(true);
    } else {
      // INCORRECT
      playIncorrectSfx();
      setIsShakeError(true);
      setMeowMood('encouraging');
      setTikusMood('giggling');
      setDialogueBubble('Hehe, ada huruf yang belum pas! Ayo coba periksa lagi, Detektif!');
      speakIndonesian('Ayo periksa lagi, Detektif! Kamu pasti bisa!');

      setTimeout(() => {
        setIsShakeError(false);
      }, 1000);
    }
  };

  // User taps/clicks a letter in the bank
  const handleSelectLetterFromBank = (tile: LetterTile) => {
    if (tile.isUsed) return;

    // Find first empty hidden slot
    const emptySlot = currentWord.hiddenIndices.find((idx) => !placedLetters[idx]);
    if (emptySlot === undefined) return; // All slots filled

    playLetterPlaceSfx();

    const newPlaced = {
      ...placedLetters,
      [emptySlot]: { letter: tile.letter, bankId: tile.id },
    };
    setPlacedLetters(newPlaced);

    // Mark tile as used in bank
    setLetterBankTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isUsed: true } : t))
    );

    // Clear hint
    setHighlightSlotIndex(null);
    setHintLetter(null);

    // Check if full
    checkWordCompletion(newPlaced);
  };

  // User drags and drops letter into a specific slot
  const handleDropLetter = (slotIndex: number, letter: string, bankId: string) => {
    if (!currentWord.hiddenIndices.includes(slotIndex)) return;

    // If slot already had a letter, restore old letter
    const oldPlaced = placedLetters[slotIndex];

    playLetterPlaceSfx();

    const newPlaced = {
      ...placedLetters,
      [slotIndex]: { letter, bankId },
    };
    setPlacedLetters(newPlaced);

    // Update bank tiles
    setLetterBankTiles((prev) =>
      prev.map((t) => {
        if (t.id === bankId) return { ...t, isUsed: true };
        if (oldPlaced && t.id === oldPlaced.bankId) return { ...t, isUsed: false };
        return t;
      })
    );

    setHighlightSlotIndex(null);
    setHintLetter(null);

    checkWordCompletion(newPlaced);
  };

  // User clicks on a placed slot to remove letter
  const handleSlotClick = (slotIndex: number) => {
    const placed = placedLetters[slotIndex];
    if (!placed) return;

    playLetterRemoveSfx();

    const updatedPlaced = { ...placedLetters };
    delete updatedPlaced[slotIndex];
    setPlacedLetters(updatedPlaced);

    // Free up tile in bank
    setLetterBankTiles((prev) =>
      prev.map((t) => (t.id === placed.bankId ? { ...t, isUsed: false } : t))
    );

    setMeowMood('idle');
    setTikusMood('sneaky');
  };

  // Hint button: Highlights the next empty slot and the correct letter tile!
  const handleUseHint = () => {
    playClickSfx();
    const nextEmptySlot = currentWord.hiddenIndices.find((idx) => !placedLetters[idx]);
    if (nextEmptySlot !== undefined) {
      const correctLetter = currentWord.word[nextEmptySlot];
      setHighlightSlotIndex(nextEmptySlot);
      setHintLetter(correctLetter);
      setMeowMood('thinking');
      setDialogueBubble(`Detektif Meow menemukan jejak: Huruf berikutnya adalah "${correctLetter}"!`);
      speakIndonesian(`Huruf berikutnya adalah ${correctLetter}`);
    }
  };

  // Next Word button
  const handleNextWord = () => {
    playClickSfx();
    setIsSolved(false);
    if (currentWordIndex + 1 < wordPool.length) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setIsLevelMapOpen(true);
      speakIndonesian('Luar biasa! Kamu telah memecahkan semua level Detektif Meow!');
    }
  };

  // Test play a specific word from Teacher Panel
  const handlePlaySpecificWord = (word: WordItem) => {
    const idx = wordPool.findIndex((w) => w.id === word.id);
    if (idx !== -1) {
      setCurrentWordIndex(idx);
    } else {
      // Add temporarily or set directly
      initializeWordTiles(word);
    }
    setViewState('PLAYING');
  };

  // Select level from Level Map
  const handleSelectLevelFromMap = (index: number) => {
    setCurrentWordIndex(index);
    setViewState('PLAYING');
    setIsLevelMapOpen(false);
    speakIndonesian(`Level ${index + 1}! Ayo temukan huruf yang hilang!`);
  };

  // Password Protected Gate to Teacher Panel
  const handleOpenTeacherAuth = () => {
    playClickSfx();
    setIsTeacherAuthOpen(true);
  };

  const handleTeacherAuthSuccess = () => {
    setIsTeacherAuthOpen(false);
    setIsTeacherPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-amber-100 flex flex-col font-['Fredoka',sans-serif] text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header */}
      <GameHeader
        stats={stats}
        currentWordIndex={currentWordIndex}
        totalWords={wordPool.length}
        gameMode={gameMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTeacherPanel={handleOpenTeacherAuth}
        onOpenHelp={() => {
          playClickSfx();
          setIsHelpOpen(true);
        }}
        onOpenLevelMap={() => {
          playClickSfx();
          setIsLevelMapOpen(true);
        }}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-center items-center">
        {viewState === 'MENU' ? (
          /* ================= TITLE SCREEN ================= */
          <div className="w-full max-w-2xl bg-white/90 border-4 border-amber-300 rounded-3xl p-6 sm:p-10 text-center shadow-xl relative overflow-hidden my-auto">
            {/* Paw watermark decorations */}
            <div className="absolute top-3 left-4 text-3xl opacity-20 select-none">🐾</div>
            <div className="absolute bottom-4 right-5 text-4xl opacity-20 select-none">🐾</div>

            {/* Character Duo Centerpiece */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
              <DetectiveMeowSvg mood="idle" size={150} className="sm:scale-115 animate-float-gentle" />
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-3xl font-black text-amber-500">VS</span>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Pencuri Huruf
                </span>
              </div>
              <TikusNakalSvg mood="sneaky" size={130} className="sm:scale-110" />
            </div>

            {/* Title Lockup */}
            <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-tight mb-2 drop-shadow-xs">
              Detektif Meow
            </h1>
            <p className="text-lg sm:text-2xl font-extrabold text-amber-700 mb-2">
              Jejak Tikus Nakal 🐾
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Bantu Detektif Meow memecahkan kata rumpang, merebut kembali kunci emas, dan membuka peti rahasia!
            </p>

            {/* Mode & Word Status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-900 mb-6 shadow-xs">
              <span>Level Terbuka: {Math.min((stats.unlockedLevel || 0) + 1, wordPool.length)} / {wordPool.length}</span>
              <span>·</span>
              <span>SD Fase A (Kelas 1 & 2)</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  playClickSfx();
                  setViewState('PLAYING');
                  speakIndonesian('Ayo mulai petualangan bersama Detektif Meow!');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-lg rounded-2xl border-b-6 border-amber-800 active:border-b-2 active:translate-y-1 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white" />
                <span>Mulai Menyelidiki!</span>
              </button>

              <button
                onClick={() => {
                  playClickSfx();
                  setIsLevelMapOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 font-bold text-base rounded-2xl border-2 border-yellow-300 border-b-4 border-b-yellow-500 active:border-b-2 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Map className="w-5 h-5 text-yellow-700" />
                <span>Peta Level</span>
              </button>

              <button
                onClick={handleOpenTeacherAuth}
                className="w-full sm:w-auto px-6 py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-base rounded-2xl border-2 border-indigo-300 border-b-4 border-b-indigo-400 active:border-b-2 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Panel Guru</span>
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= PLAYING ARENA ================= */
          <div className="w-full flex flex-col items-center">
            {/* Characters Staging & Dialogue Bubble Row */}
            <div className="w-full max-w-3xl flex items-center justify-between gap-2 sm:gap-4 mb-3">
              {/* Detektif Meow */}
              <div className="flex flex-col items-center">
                <DetectiveMeowSvg mood={meowMood} size={110} className="sm:scale-105" />
                <span className="text-[11px] sm:text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                  Detektif Meow
                </span>
              </div>

              {/* Dialogue Speech Bubble */}
              <div className="flex-1 bg-white border-2 border-amber-300 rounded-2xl p-2.5 sm:p-3 text-center shadow-xs relative">
                <p className="text-xs sm:text-sm font-extrabold text-amber-950">
                  {dialogueBubble}
                </p>
                {/* Small indicator */}
                <div className="text-[10px] text-amber-700 font-medium mt-0.5 hidden sm:block">
                  Level {currentWordIndex + 1}: Ketuk huruf atau geser ke kotak bertanda 🔍
                </div>
              </div>

              {/* Tikus Nakal with Stolen Letter Sack */}
              <div className="flex flex-col items-center">
                <TikusNakalSvg mood={tikusMood} size={95} className="sm:scale-105" />
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full border border-slate-300">
                  Tikus Nakal
                </span>
              </div>
            </div>

            {/* Word Cloze Play Area */}
            <WordPlayArea
              currentWord={currentWord}
              placedLetters={placedLetters}
              onSlotClick={handleSlotClick}
              onDropLetter={handleDropLetter}
              onPlayClueAudio={handlePlayClueAudio}
              onUseHint={handleUseHint}
              onResetSlots={handleResetSlots}
              isShakeError={isShakeError}
              highlightSlotIndex={highlightSlotIndex}
            />

            {/* Letter Bank */}
            <LetterBank
              tiles={letterBankTiles}
              onSelectLetter={handleSelectLetterFromBank}
              hintLetter={hintLetter}
            />

            {/* Navigation / Skip Controls */}
            <div className="w-full max-w-xl flex items-center justify-between mt-6 pt-3 border-t border-amber-200/70 text-xs">
              <button
                onClick={() => {
                  playClickSfx();
                  setViewState('MENU');
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-900 font-bold active:scale-95 transition-all"
              >
                ← Menu Utama
              </button>

              <button
                onClick={() => {
                  playClickSfx();
                  setIsLevelMapOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 active:scale-95 transition-all"
              >
                <Map className="w-3.5 h-3.5 text-amber-700" />
                <span>Peta Level</span>
              </button>

              <button
                onClick={() => {
                  playClickSfx();
                  handleNextWord();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Lewati Soal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer info (Clean, uncluttered, stress-free) */}
      <footer className="w-full py-2 px-4 text-center text-xs font-semibold text-amber-800/80 select-none">
        Detektif Meow: Jejak Tikus Nakal · Game Edukasi Literasi SD Fase A
      </footer>

      {/* Modals */}
      {isSolved && (
        <FeedbackCelebration
          word={currentWord}
          currentLevelNumber={currentWordIndex + 1}
          totalLevels={wordPool.length}
          onNextWord={handleNextWord}
          onOpenLevelMap={() => {
            setIsSolved(false);
            setIsLevelMapOpen(true);
          }}
          onPronounceWord={() => speakIndonesian(currentWord.word)}
        />
      )}

      {/* Level Select Map Modal */}
      {isLevelMapOpen && (
        <LevelSelectModal
          words={wordPool}
          currentLevelIndex={currentWordIndex}
          stats={stats}
          onSelectLevel={handleSelectLevelFromMap}
          onClose={() => setIsLevelMapOpen(false)}
        />
      )}

      {/* Password Gate for Teacher Panel */}
      {isTeacherAuthOpen && (
        <TeacherAuthModal
          onSuccess={handleTeacherAuthSuccess}
          onClose={() => setIsTeacherAuthOpen(false)}
        />
      )}

      {/* Teacher Unlimited Level Editor Modal */}
      {isTeacherPanelOpen && (
        <TeacherEditorModal
          customWords={customWords}
          onUpdateCustomWords={setCustomWords}
          gameMode={gameMode}
          onUpdateGameMode={setGameMode}
          onPlaySpecificWord={handlePlaySpecificWord}
          onClose={() => setIsTeacherPanelOpen(false)}
        />
      )}

      {isHelpOpen && <HowToPlayModal onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
}
