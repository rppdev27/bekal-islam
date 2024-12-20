import React, { useState } from 'react';
import { EpubViewer } from './EpubViewer';
import { EpubControls } from './EpubControls';
import { EpubHeader } from './EpubHeader';
import { TableOfContents } from '../ui/TableOfContents';
import { useEpubBook } from '../../hooks/useEpubBook';
import { useEpubNavigation } from '../../hooks/useEpubNavigation';

export function EpubReader() {
  const [showToc, setShowToc] = useState(false);
  const {
    book,
    toc,
    currentPage,
    totalPages,
    loadBook,
    handleLocationChange
  } = useEpubBook();

  const { jumpToChapter } = useEpubNavigation(book?.rendition);

  const handleChapterSelect = async (href: string) => {
    await jumpToChapter(href);
    setShowToc(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <EpubHeader
        currentPage={currentPage}
        totalPages={totalPages}
        onFileUpload={loadBook}
        onToggleToc={() => setShowToc(!showToc)}
        hasBook={!!book}
      />

      <div className="flex-1 relative">
        {showToc && (
          <TableOfContents
            toc={toc}
            onSelect={handleChapterSelect}
            onClose={() => setShowToc(false)}
          />
        )}
        
        <div className="absolute inset-0 flex">
          <EpubControls
            rendition={book?.rendition}
            disabled={!book}
          />
          <EpubViewer
            book={book}
            onLocationChange={handleLocationChange}
          />
        </div>
      </div>
    </div>
  );
}