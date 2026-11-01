/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WordItem {
  id: string;
  word: string; // e.g. "BATU", uppercase
  hiddenIndices: number[]; // e.g. [1] (letter 'A') or [1, 2]
  clue: string; // e.g. "Benda keras yang biasa ditemukan di sungai atau gunung"
  category: string; // e.g. "Alam", "Hewan", "Buah", "Sekolah", "Benda"
  categoryIcon: string; // emoji e.g. "🪨"
  distractors?: string[]; // additional misleading letters for letter bank
  difficulty?: 'MUDAH' | 'SEDANG' | 'SULIT' | 'MASTER';
  zone?: string; // e.g. "Zona 1: Detektif Pemula"
  isCustom?: boolean;
  createdAt?: number;
}

export type GameMode = 'ALL' | 'CUSTOM_ONLY' | 'DEFAULT_ONLY';

export interface LetterTile {
  id: string;
  letter: string;
  isUsed: boolean;
}

export interface PlayerStats {
  stars: number;
  keys: number;
  solvedWordIds: string[];
  totalChestsOpened: number;
  unlockedLevel: number; // Highest level unlocked (0-indexed or 1-indexed)
  levelStars: { [levelIndex: number]: number }; // Stars earned per level (1-3)
}

export interface LevelInfo {
  levelNumber: number; // 1, 2, 3...
  worldName: string;   // e.g. "Halaman Sekolah", "Taman Bunga", "Dapur Rahasia"
  worldIcon: string;
  word: WordItem;
  isUnlocked: boolean;
  isCompleted: boolean;
  starsEarned: number;
}

