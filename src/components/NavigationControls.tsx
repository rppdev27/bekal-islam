import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentPage,
  numPages,
  onPageChange,
}) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => onPageChange(Math.min(numPages, currentPage + 1))}
        disabled={currentPage >= numPages}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};