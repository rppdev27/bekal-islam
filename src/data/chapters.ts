import { Book, ChevronRight, User, Heart, FileText } from 'lucide-react';

export interface Chapter {
  id: number;
  title: string;
  page: number;
  icon: typeof Book | typeof User | typeof Heart | typeof FileText;
  subchapters?: Omit<Chapter, 'subchapters'>[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Sejarah Syaikh Muhammad bin Abdul Wahhab رحمه الله",
    page: 1,
    icon: Book
  },
  {
    id: 2,
    title: "Ciri-Ciri Dakwah Syaikh Muhammad Bin Abdul Wahhab",
    page: 13,
    icon: Book
  },
  {
    id: 3,
    title: "Syarh al-Ushul Ats-Tsalatsah",
    page: 1,
    icon: Book,
    subchapters: [
      {
        id: 4,
        title: "Pokok Pertama: Mengenal Allah",
        page: 67,
        icon: Book
      },
      {
        id: 5,
        title: "Pokok Kedua: Mengenal Agama Islam",
        page: 105,
        icon: Book
      },
      {
        id: 6,
        title: "Pokok Ketiga: Mengenal Nabi ﷺ",
        page: 133,
        icon: Book
      }
    ]
  },
  {
    id: 7,
    title: "Syarah 4 Kaidah Penting Memahami Tauhid",
    page: 175,
    icon: Book
  }
];