import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { Book as EpubType } from 'epubjs';
import { ChevronLeft, ChevronRight, List, Upload } from 'lucide-react';
import { Button } from './Button';
import { TableOfContents } from './TableOfContents';
import type { NavItem } from '../types';

export function EpubReader() {
  const [book, setBook] = useState<EpubType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [toc, setToc] = useState<NavItem[]>([]);
  const [showToc, setShowToc] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const newBook = ePub(arrayBuffer);
        setBook(newBook);
        
        const navigation = await newBook.navigation.load();
        setToc(navigation.toc);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (book && viewerRef.current) {
      renditionRef.current = book.renderTo(viewerRef.current, {
        width: '100%',
        height: '100%',
        spread: 'none'
      });

      renditionRef.current.display();

      renditionRef.current.on('relocated', (location: any) => {
        setCurrentPage(location.start.location);
        setTotalPages(location.total);
      });
    }

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, [book]);

  const nextPage = () => {
    renditionRef.current?.next();
  };

  const prevPage = () => {
    renditionRef.current?.prev();
  };

  const jumpToChapter = async (href: string) => {
    if (renditionRef.current) {
      await renditionRef.current.display(href);
      setShowToc(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowToc(!showToc)}
              aria-label="Toggle table of contents"
            >
              <List className="w-5 h-5" />
            </Button>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium">Upload ePub</span>
              <input
                type="file"
                accept=".epub"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {book && (
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 relative">
        {showToc && (
          <TableOfContents
            toc={toc}
            onSelect={jumpToChapter}
            onClose={() => setShowToc(false)}
          />
        )}
        
        <div className="absolute inset-0 flex">
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={prevPage}
            disabled={!book}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div
            ref={viewerRef}
            className="flex-1 bg-white shadow-lg mx-12 my-6 rounded-lg overflow-hidden"
          />

          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={nextPage}
            disabled={!book}
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}