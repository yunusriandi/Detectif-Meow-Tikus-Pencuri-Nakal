/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WordItem, GameMode, PlayerStats } from '../types/game';
import { DEFAULT_WORDS } from '../data/defaultWords';

const STORAGE_KEY_CUSTOM_WORDS = 'detektif_meow_custom_words';
const STORAGE_KEY_STATS = 'detektif_meow_stats';
const STORAGE_KEY_MODE = 'detektif_meow_mode';
const STORAGE_KEY_MUTED = 'detektif_meow_muted';
const STORAGE_KEY_TEACHER_PIN = 'detektif_meow_teacher_pin';

export const DEFAULT_TEACHER_PIN = 'GURU123';

export function loadCustomWords(): WordItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_WORDS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom words:', e);
    return [];
  }
}

export function saveCustomWords(words: WordItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_WORDS, JSON.stringify(words));
  } catch (e) {
    console.error('Error saving custom words:', e);
  }
}

export function loadPlayerStats(): PlayerStats {
  const defaultStats: PlayerStats = {
    stars: 0,
    keys: 0,
    solvedWordIds: [],
    totalChestsOpened: 0,
    unlockedLevel: 0, // Level 1 is index 0
    levelStars: {},
  };

  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      stars: typeof parsed.stars === 'number' ? parsed.stars : 0,
      keys: typeof parsed.keys === 'number' ? parsed.keys : 0,
      solvedWordIds: Array.isArray(parsed.solvedWordIds) ? parsed.solvedWordIds : [],
      totalChestsOpened: typeof parsed.totalChestsOpened === 'number' ? parsed.totalChestsOpened : 0,
      unlockedLevel: typeof parsed.unlockedLevel === 'number' ? parsed.unlockedLevel : 0,
      levelStars: parsed.levelStars && typeof parsed.levelStars === 'object' ? parsed.levelStars : {},
    };
  } catch {
    return defaultStats;
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats:', e);
  }
}

export function loadGameMode(): GameMode {
  if (typeof window === 'undefined') return 'ALL';
  const raw = localStorage.getItem(STORAGE_KEY_MODE) as GameMode | null;
  if (raw === 'CUSTOM_ONLY' || raw === 'DEFAULT_ONLY' || raw === 'ALL') {
    return raw;
  }
  return 'ALL';
}

export function saveGameMode(mode: GameMode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MODE, mode);
}

export function loadSoundMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY_MUTED) === 'true';
}

export function saveSoundMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MUTED, muted ? 'true' : 'false');
}

export function getTeacherPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_TEACHER_PIN;
  return localStorage.getItem(STORAGE_KEY_TEACHER_PIN) || DEFAULT_TEACHER_PIN;
}

export function setTeacherPassword(newPin: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_TEACHER_PIN, newPin.trim());
}

export function verifyTeacherPassword(pin: string): boolean {
  const current = getTeacherPassword();
  // Case-insensitive check for user convenience
  return pin.trim().toUpperCase() === current.trim().toUpperCase();
}

export function getActiveWordPool(mode: GameMode, customWords: WordItem[]): WordItem[] {
  if (mode === 'CUSTOM_ONLY') {
    return customWords.length > 0 ? customWords : DEFAULT_WORDS;
  }
  if (mode === 'DEFAULT_ONLY') {
    return DEFAULT_WORDS;
  }
  // Mode ALL (Gabungan)
  return [...DEFAULT_WORDS, ...customWords];
}
