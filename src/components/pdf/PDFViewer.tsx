import React, { useEffect, useRef, useState } from 'react';
import { List, BookOpen } from 'lucide-react';
import { usePDF } from '../../hooks/usePDF';
import { usePDFOutline } from '../../hooks/usePDFOutline';
import { usePDFSearch } from '../../hooks/usePDFSearch';
import { navigateToDestination } from '../../utils/pdfNavigation';
import { PDFControls } from './PDFControls';
import { PDFPage } from './PDFPage';
import { PDFTableOfContents } from './PDFTableOfContents';
import { PDFSearch } from './PDFSearch';
import { Button } from '../ui/Button';
import type { PDFPageInfo } from '../../types/pdf';

interface PDFViewerProps {
  url: string;
  onPageChange?: (pageInfo: PDFPageInfo) => void;
}

export function PDFViewer({ url, onPageChange }: PDFViewerProps) {
  const { pdf, loading, error } = usePDF(url);
  const outline = usePDFOutline(pdf);
  const { searchText, searchResults, searching } = usePDFSearch(pdf);
  const [pageNumber, setPageNumber] = useState(1);
  const [showToc, setShowToc] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pdf && onPageChange) {
      onPageChange({ pageNumber, totalPages: pdf.numPages });
    }
  }, [pdf, pageNumber, onPageChange]);

  const handleOutlineClick = async (dest: any) => {
    if (!pdf) return;
    
    const newPage = await navigateToDestination(pdf, dest);
    setPageNumber(newPage);
    setShowToc(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-600">
          <p>Error loading PDF: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!pdf) {
    return null;
  }

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="flex flex-col p-4 bg-white border-b space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-lg">PDF Reader</span>
            <Button
              variant="ghost"
              onClick={() => setShowToc(!showToc)}
              aria-label="Toggle table of contents"
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
          <PDFControls
            pageNumber={pageNumber}
            totalPages={pdf.numPages}
            onPageChange={setPageNumber}
          />
        </div>
        <PDFSearch
          onSearch={searchText}
          results={searchResults}
          onResultClick={setPageNumber}
          searching={searching}
        />
      </div>
      <div className="flex-1 overflow-hidden relative">
        {showToc && outline.length > 0 && (
          <PDFTableOfContents
            outline={outline}
            onItemClick={handleOutlineClick}
            onClose={() => setShowToc(false)}
          />
        )}
        <div className="h-full overflow-auto">
          <PDFPage
            pdf={pdf}
            pageNumber={pageNumber}
            containerWidth={containerRef.current?.clientWidth ?? 800}
          />
        </div>
      </div>
    </div>
  );
}