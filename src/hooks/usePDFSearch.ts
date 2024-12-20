import { useState, useCallback } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

export function usePDFSearch(pdf: PDFDocumentProxy | null) {
  const [searchResults, setSearchResults] = useState<Array<{ pageNumber: number; text: string }>>([]);
  const [searching, setSearching] = useState(false);

  const searchText = useCallback(async (query: string) => {
    if (!pdf || !query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    const results: Array<{ pageNumber: number; text: string }> = [];

    try {
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        
        if (pageText.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            pageNumber: i,
            text: pageText.substring(
              Math.max(pageText.toLowerCase().indexOf(query.toLowerCase()) - 40, 0),
              pageText.toLowerCase().indexOf(query.toLowerCase()) + query.length + 40
            )
          });
        }
      }
    } catch (error) {
      console.error('Error searching PDF:', error);
    }

    setSearchResults(results);
    setSearching(false);
  }, [pdf]);

  return { searchText, searchResults, searching };
}