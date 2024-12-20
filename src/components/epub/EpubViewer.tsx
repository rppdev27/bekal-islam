import React, { useEffect, useRef } from 'react';
import { Book as EpubType } from 'epubjs';

interface EpubViewerProps {
  book: EpubType | null;
  onLocationChange: (location: { start: { location: number }, total: number }) => void;
}

export function EpubViewer({ book, onLocationChange }: EpubViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<any>(null);

  useEffect(() => {
    if (book && viewerRef.current) {
      renditionRef.current = book.renderTo(viewerRef.current, {
        width: '100%',
        height: '100%',
        spread: 'none',
        flow: 'scrolled-doc',
        stylesheet: '/src/styles/epub.css'
      });

      renditionRef.current.display();
      renditionRef.current.on('relocated', onLocationChange);

      // Add keyboard navigation
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          renditionRef.current?.next();
        } else if (e.key === 'ArrowLeft') {
          renditionRef.current?.prev();
        }
      };

      window.addEventListener('keyup', handleKeyPress);
      return () => {
        window.removeEventListener('keyup', handleKeyPress);
        if (renditionRef.current) {
          renditionRef.current.destroy();
        }
      };
    }
  }, [book, onLocationChange]);

  if (!book) {
    return (
      <div className="flex-1 bg-white shadow-lg mx-12 my-6 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium mb-2">Loading Moby Dick...</p>
          <p className="text-sm">You can also upload your own ePub file using the button above.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={viewerRef}
      className="flex-1 bg-white shadow-lg mx-12 my-6 rounded-lg overflow-hidden"
    />
  );
}