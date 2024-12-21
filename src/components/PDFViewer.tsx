import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Sidebar } from './Sidebar';
import { Modal } from './Modal';
import { SearchResults } from './SearchResults';
import { NavigationControls } from './NavigationControls';
import { searchPDF, SearchResult } from '../utils/pdfSearch';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onDocumentLoadSuccess = (pdf: pdfjs.PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setPdfDocument(pdf);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim() || !pdfDocument) return;

    setIsSearching(true);
    setIsSearchOpen(true);
    setSearchResults([]);

    try {
      const results = await searchPDF(pdfDocument, query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsSearchOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-white border-b p-2 sm:p-4 flex items-center justify-end">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 text-sm sm:text-base transition-colors"
            >
              -
            </button>
            <span className="text-sm sm:text-base min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 text-sm sm:text-base transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-center p-4 sm:p-8">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="shadow-xl max-w-full"
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              className="bg-white max-w-full"
              width={Math.min(window.innerWidth - 64, 800)}
            />
          </Document>
        </div>
      </div>

      <NavigationControls
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Search Results"
      >
        <SearchResults
          results={searchResults}
          onPageClick={handlePageChange}
          isSearching={isSearching}
        />
      </Modal>
    </div>
  );
};