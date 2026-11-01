/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WordItem } from '../types/game';

export const DEFAULT_WORDS: WordItem[] = [
  // =========================================================================
  // ZONA 1: DETEKTIF PEMULA (Level 1 - 8) - TINGKAT SANGAT MUDAH
  // Pola Kata 4 Huruf Sederhana (KVKV), 1 Huruf Hilang (Vokal / Konsonan Jelas)
  // =========================================================================
  {
    id: 'def-1',
    word: 'BATU',
    hiddenIndices: [1], // 'A' -> B _ T U
    clue: 'Benda keras yang biasa ditemukan di sungai atau gunung',
    category: 'Alam',
    categoryIcon: '🪨',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['O', 'E'],
  },
  {
    id: 'def-2',
    word: 'BUKU',
    hiddenIndices: [2], // 'K' -> B U _ U
    clue: 'Lembaran kertas penuh cerita yang kita baca di sekolah',
    category: 'Sekolah',
    categoryIcon: '📖',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['R', 'M'],
  },
  {
    id: 'def-3',
    word: 'MEJA',
    hiddenIndices: [1], // 'E' -> M _ J A
    clue: 'Tempat menaruh buku dan pensil saat belajar di kelas',
    category: 'Sekolah',
    categoryIcon: '🪑',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['I', 'O'],
  },
  {
    id: 'def-4',
    word: 'BOLA',
    hiddenIndices: [1], // 'O' -> B _ L A
    clue: 'Mainan bulat yang seru ditendang bersama teman di lapangan',
    category: 'Mainan',
    categoryIcon: '⚽',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['E', 'U'],
  },
  {
    id: 'def-5',
    word: 'TOPI',
    hiddenIndices: [1], // 'O' -> T _ P I
    clue: 'Pelindung kepala saat bermain di bawah sinar matahari',
    category: 'Pakaian',
    categoryIcon: '🧢',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['A', 'E'],
  },
  {
    id: 'def-6',
    word: 'SUSU',
    hiddenIndices: [1], // 'U' -> S _ S U
    clue: 'Minuman putih sehat bergizi yang dihasilkan oleh sapi',
    category: 'Makanan',
    categoryIcon: '🥛',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['A', 'I'],
  },
  {
    id: 'def-7',
    word: 'MATA',
    hiddenIndices: [1], // 'A' -> M _ T A
    clue: 'Indera penglihatan untuk mengamati jejak Tikus Nakal',
    category: 'Tubuh',
    categoryIcon: '👀',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['O', 'I'],
  },
  {
    id: 'def-8',
    word: 'GIGI',
    hiddenIndices: [1], // 'I' -> G _ G I
    clue: 'Berwarna putih bersih di dalam mulut, rajin kita sikat setiap hari',
    category: 'Tubuh',
    categoryIcon: '🦷',
    difficulty: 'MUDAH',
    zone: 'Zona 1: Halaman Sekolah',
    distractors: ['A', 'U'],
  },

  // =========================================================================
  // ZONA 2: DETEKTIF CILIK (Level 9 - 16) - TINGKAT SEDANG
  // Pola Kata 4 - 5 Huruf (Konsonan Akhir / Diftong), 1 hingga 2 Huruf Hilang
  // =========================================================================
  {
    id: 'def-9',
    word: 'APEL',
    hiddenIndices: [2], // 'E' -> A P _ L
    clue: 'Buah manis renyah, berwarna merah atau hijau segar',
    category: 'Buah',
    categoryIcon: '🍎',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['U', 'O', 'T'],
  },
  {
    id: 'def-10',
    word: 'IKAN',
    hiddenIndices: [2], // 'A' -> I K _ N
    clue: 'Hewan bersisik yang berenang lincah di dalam air jernih',
    category: 'Hewan',
    categoryIcon: '🐟',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['E', 'U', 'M'],
  },
  {
    id: 'def-11',
    word: 'AYAM',
    hiddenIndices: [2], // 'A' -> A Y _ M
    clue: 'Unggas berkokok merdu di pagi hari membangunkan kita',
    category: 'Hewan',
    categoryIcon: '🐔',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['U', 'O', 'P'],
  },
  {
    id: 'def-12',
    word: 'ROTI',
    hiddenIndices: [1], // 'O' -> R _ T I
    clue: 'Makanan sarapan lembut dari gandum yang enak dioles selai',
    category: 'Makanan',
    categoryIcon: '🍞',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['U', 'A', 'S'],
  },
  {
    id: 'def-13',
    word: 'POHON',
    hiddenIndices: [3], // 'O' -> P O H _ N
    clue: 'Tanaman rindang dengan batang kayu kokoh dan daun hijau',
    category: 'Alam',
    categoryIcon: '🌳',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['A', 'I', 'R'],
  },
  {
    id: 'def-14',
    word: 'HUJAN',
    hiddenIndices: [2], // 'J' -> H U _ A N
    clue: 'Tetesan air sejuk yang turun dari awan di langit',
    category: 'Alam',
    categoryIcon: '🌧️',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['D', 'M', 'B'],
  },
  {
    id: 'def-15',
    word: 'RUSA',
    hiddenIndices: [1, 3], // 'U', 'A' -> R _ S _ (2 Huruf Hilang)
    clue: 'Hewan lincah bertanduk indah yang berlari kencang pemakan rumput',
    category: 'Hewan',
    categoryIcon: '🦌',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['O', 'I', 'K'],
  },
  {
    id: 'def-16',
    word: 'DAUN',
    hiddenIndices: [1, 2], // 'A', 'U' -> D _ _ N (2 Huruf Hilang)
    clue: 'Bagian tumbuhan berwarna hijau tempat memasak makanan dari matahari',
    category: 'Alam',
    categoryIcon: '🍃',
    difficulty: 'SEDANG',
    zone: 'Zona 2: Rumah & Dapur',
    distractors: ['O', 'I', 'E'],
  },

  // =========================================================================
  // ZONA 3: DETEKTIF HANDAL (Level 17 - 24) - TINGKAT MENENGAH
  // Pola Kata 5 - 6 Huruf (Konsonan Rangkap, Fonem NG), 2 Huruf Hilang
  // =========================================================================
  {
    id: 'def-17',
    word: 'KUCING',
    hiddenIndices: [2, 4], // 'C', 'N' -> K U _ I _ G (2 Huruf Hilang)
    clue: 'Sahabat berbulu Detektif Meow yang mengeong ramah dan suka tidur',
    category: 'Hewan',
    categoryIcon: '🐱',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['S', 'M', 'P'],
  },
  {
    id: 'def-18',
    word: 'BUNGA',
    hiddenIndices: [2, 3], // 'N', 'G' -> B U _ _ A (2 Huruf Hilang)
    clue: 'Tanaman mekar harum berwarna-warni yang dikunjungi kupu-kupu',
    category: 'Alam',
    categoryIcon: '🌸',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['L', 'T', 'D'],
  },
  {
    id: 'def-19',
    word: 'PENSIL',
    hiddenIndices: [2, 4], // 'N', 'I' -> P E _ S _ L (2 Huruf Hilang)
    clue: 'Alat belajar runcing dari kayu untuk menulis huruf di buku tulis',
    category: 'Sekolah',
    categoryIcon: '✏️',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['M', 'E', 'B'],
  },
  {
    id: 'def-20',
    word: 'PISANG',
    hiddenIndices: [2, 4], // 'S', 'N' -> P I _ A _ G (2 Huruf Hilang)
    clue: 'Buah kuning panjang manis yang kulitnya mudah dikupas',
    category: 'Buah',
    categoryIcon: '🍌',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['C', 'T', 'M'],
  },
  {
    id: 'def-21',
    word: 'SEPATU',
    hiddenIndices: [2, 5], // 'P', 'U' -> S E _ A T _ (2 Huruf Hilang)
    clue: 'Alas kaki berkaus kaki yang dipakai rapi saat berangkat sekolah',
    category: 'Sekolah',
    categoryIcon: '👟',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['B', 'O', 'I'],
  },
  {
    id: 'def-22',
    word: 'DOMPET',
    hiddenIndices: [2, 4], // 'M', 'E' -> D O _ P _ T (2 Huruf Hilang)
    clue: 'Benda lipat kecil untuk menyimpan uang saku dan kartu tanda siswa',
    category: 'Benda',
    categoryIcon: '👛',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['N', 'I', 'B'],
  },
  {
    id: 'def-23',
    word: 'KELINCI',
    hiddenIndices: [2, 4], // 'L', 'N' -> K E _ I _ C I (2 Huruf Hilang)
    clue: 'Hewan menggemaskan bertelinga panjang yang suka melompat dan makan wortel',
    category: 'Hewan',
    categoryIcon: '🐰',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['R', 'M', 'T'],
  },
  {
    id: 'def-24',
    word: 'SEPEDA',
    hiddenIndices: [2, 4], // 'P', 'D' -> S E _ E _ A (2 Huruf Hilang)
    clue: 'Kendaraan roda dua tanpa mesin yang asyik dikayuh sore hari',
    category: 'Mainan',
    categoryIcon: '🚲',
    difficulty: 'SULIT',
    zone: 'Zona 3: Taman Satwa & Alam',
    distractors: ['B', 'T', 'G'],
  },

  // =========================================================================
  // ZONA 4: DETEKTIF MASTER (Level 25 - 32) - TINGKAT TANTANGAN CERDAS
  // Pola Kata 6 - 8 Huruf Tematik SD Fase A, 3 Huruf Hilang
  // =========================================================================
  {
    id: 'def-25',
    word: 'SEKOLAH',
    hiddenIndices: [2, 4, 6], // 'K', 'L', 'H' -> S E _ O _ A _ (3 Huruf Hilang)
    clue: 'Gedung tempat murid-murid menuntut ilmu dan belajar bersama guru tercinta',
    category: 'Sekolah',
    categoryIcon: '🏫',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['P', 'R', 'N'],
  },
  {
    id: 'def-26',
    word: 'MATAHARI',
    hiddenIndices: [2, 4, 6], // 'T', 'H', 'R' -> M A _ A _ A _ I (3 Huruf Hilang)
    clue: 'Bintang raksasa yang menerangi bumi dan memberi kehangatan di siang hari',
    category: 'Alam',
    categoryIcon: '☀️',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['D', 'B', 'S'],
  },
  {
    id: 'def-27',
    word: 'BINTANG',
    hiddenIndices: [1, 3, 5], // 'I', 'T', 'N' -> B _ N _ A _ G (3 Huruf Hilang)
    clue: 'Benda langit berkelap-kelip indah menghiasi malam gelap',
    category: 'Alam',
    categoryIcon: '⭐',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['U', 'D', 'M'],
  },
  {
    id: 'def-28',
    word: 'PELANGI',
    hiddenIndices: [2, 4, 6], // 'L', 'N', 'I' -> P E _ A _ G _ (3 Huruf Hilang)
    clue: 'Lengkungan indah tujuh warna di langit yang muncul setelah hujan reda',
    category: 'Alam',
    categoryIcon: '🌈',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['R', 'M', 'E'],
  },
  {
    id: 'def-29',
    word: 'KELUARGA',
    hiddenIndices: [2, 4, 6], // 'L', 'A', 'G' -> K E _ U _ R _ A (3 Huruf Hilang)
    clue: 'Ayah, ibu, kakak, dan adik tercinta yang tinggal serumah bersama kita',
    category: 'Keluarga',
    categoryIcon: '👨‍👩‍👧‍👦',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['R', 'O', 'T'],
  },
  {
    id: 'def-30',
    word: 'JENDELA',
    hiddenIndices: [2, 4, 6], // 'N', 'E', 'A' -> J E _ D _ L _ (3 Huruf Hilang)
    clue: 'Lubang berkaca di dinding rumah tempat udara segar dan cahaya matahari masuk',
    category: 'Rumah',
    categoryIcon: '🪟',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['M', 'I', 'U'],
  },
  {
    id: 'def-31',
    word: 'LEMARI',
    hiddenIndices: [1, 3, 5], // 'E', 'A', 'I' -> L _ M _ R _ (3 Huruf Hilang)
    clue: 'Perabot rumah dari kayu tempat menggantung baju agar rapi dan wangi',
    category: 'Rumah',
    categoryIcon: '🚪',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['U', 'O', 'P'],
  },
  {
    id: 'def-32',
    word: 'KUPUKUPU',
    hiddenIndices: [2, 5, 7], // 'P', 'K', 'U' -> K U _ U _ U P _ (3 Huruf Hilang)
    clue: 'Serangga bersayap corak indah yang terbang hinggap mengisap sari madu bunga',
    category: 'Hewan',
    categoryIcon: '🦋',
    difficulty: 'MASTER',
    zone: 'Zona 4: Kota Misteri Tikus',
    distractors: ['B', 'D', 'T'],
  },
];
