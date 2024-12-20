import { useState, useCallback, useEffect } from 'react';
import ePub, { Book as EpubType } from 'epubjs';
import type { NavItem } from '../types';

export function useEpubBook() {
  const [book, setBook] = useState<EpubType | null>(null);
  const [toc, setToc] = useState<NavItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Load default book on mount
  useEffect(() => {
    const loadDefaultBook = async () => {
      try {
        const response = await fetch('https://s3.amazonaws.com/moby-dick/OPS/package.opf');
        const arrayBuffer = await response.arrayBuffer();
        const newBook = ePub(arrayBuffer);
        setBook(newBook);
        
        const navigation = await newBook.navigation.load();
        setToc(navigation.toc);
      } catch (error) {
        console.error('Error loading default book:', error);
      }
    };

    loadDefaultBook();
  }, []);

  const loadBook = useCallback(async (file: File) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const newBook = ePub(arrayBuffer);
      setBook(newBook);
      
      const navigation = await newBook.navigation.load();
      setToc(navigation.toc);
    };
    
    reader.readAsArrayBuffer(file);
  }, []);

  const handleLocationChange = useCallback((location: { start: { location: number }, total: number }) => {
    setCurrentPage(location.start.location);
    setTotalPages(location.total);
  }, []);

  return {
    book,
    toc,
    currentPage,
    totalPages,
    loadBook,
    handleLocationChange
  };
}