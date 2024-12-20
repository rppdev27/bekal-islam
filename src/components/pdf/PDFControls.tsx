import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PDFControlsProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PDFControls({ pageNumber, totalPages, onPageChange }: PDFControlsProps) {
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < totalPages) {
      onPageChange(pageNumber + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-white border-b">
      <Button
        variant="ghost"
        onClick={goToPrevPage}
        disabled={pageNumber <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      
      <span className="text-sm">
        Page {pageNumber} of {totalPages}
      </span>

      <Button
        variant="ghost"
        onClick={goToNextPage}
        disabled={pageNumber >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}