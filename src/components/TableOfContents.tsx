import React from 'react';
import { Book, User, Heart, ChevronRightCircleIcon, ChevronRight, ArrowBigRight, DotIcon } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  page: number;
  icon?: React.ReactNode;
  isSubchapter?: boolean;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Sejarah ssSyaikh Muhammad bin Abdul Wahhab رحمه الله",
    page: 1,
    icon: <ArrowBigRight className="w-4 h-4" />
  },
  {
    id: 2,
    title: "Ciri-Ciri Dakwah Syaikh Muhammad Bin Abdul Wahhab",
    page: 13,
    icon: <ArrowBigRight className="w-4 h-4" />
  },
  {
    id: 3,
    title: "Syarh al-Ushul Ats-Tsalatsah (Tiga Landasan Pokok Agama)",
    page: 1,
    icon: <ArrowBigRight className="w-4 h-4" />
  },
  {
    id: 4,
    title: "Pokok Pertama: Mengenal Allah",
    page: 67,
    icon: <ArrowBigRight className="w-4 h-4" />,
    isSubchapter: true
  },
  {
    id: 5,
    title: "Pokok Kedua: Mengenal Agama Islam",
    page: 105,
    icon: <ArrowBigRight className="w-4 h-4" />,
    isSubchapter: true
  },
  {
    id: 6,
    title: "Pokok Ketiga: Mengenal Nabi ﷺ",
    page: 133,
    icon: <ArrowBigRight className="w-4 h-4" />,
    isSubchapter: true
  },
  {
    id: 7,
    title: "Syarah 4 Kaidah Penting Memahami Tauhid",
    page: 175,
    icon: <ArrowBigRight className="w-4 h-4" />
  }
];

interface TableOfContentsProps {
  onPageSelect: (page: number) => void;
  currentPage: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  onPageSelect,
  currentPage
}) => {
  return (
    <div className="space-y-1">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onPageSelect(chapter.page)}
          className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 
            ${currentPage === chapter.page
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
            } ${chapter.isSubchapter ? "pl-8" : ""}`}
        >
          {chapter.icon}
          <span className="flex-1 text-left">{chapter.title}</span>
          <span className="text-gray-400 text-xs">{chapter.page}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      ))}
    </div>
  );
};