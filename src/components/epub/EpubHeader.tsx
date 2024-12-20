import React from 'react';
import { List, Upload, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';

interface EpubHeaderProps {
  currentPage: number;
  totalPages: number;
  onFileUpload: (file: File) => void;
  onToggleToc: () => void;
  hasBook: boolean;
}

export function EpubHeader({
  currentPage,
  totalPages,
  onFileUpload,
  onToggleToc,
  hasBook
}: EpubHeaderProps) {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-lg">ePub Reader</span>
          </div>
          <Button
            variant="ghost"
            onClick={onToggleToc}
            aria-label="Toggle table of contents"
          >
            <List className="w-5 h-5" />
          </Button>
          <FileUpload
            accept=".epub"
            onChange={onFileUpload}
            icon={<Upload className="w-5 h-5" />}
            label="Upload ePub"
          />
        </div>
        {hasBook && (
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </header>
  );
}