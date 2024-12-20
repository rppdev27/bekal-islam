import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { PDFOutline } from '../../types/pdf';

interface PDFTableOfContentsProps {
  outline: PDFOutline[];
  onItemClick: (dest: any) => void;
  onClose: () => void;
}

export function PDFTableOfContents({ outline, onItemClick, onClose }: PDFTableOfContentsProps) {
  return (
    <div className="absolute left-0 top-0 z-20 h-full w-64 bg-white shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Contents</h2>
        <Button variant="ghost" onClick={onClose} aria-label="Close table of contents">
          <X className="w-5 h-5" />
        </Button>
      </div>
      <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]">
        {outline.map((item, index) => (
          <button
            key={index}
            onClick={() => onItemClick(item.dest)}
            className="block w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 text-sm"
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}