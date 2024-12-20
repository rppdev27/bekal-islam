import { useState, useEffect } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { pdfLib } from '../config/pdf';

export function usePDF(url: string) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        const document = await pdfLib.getDocument(url).promise;
        setPdf(document);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load PDF'));
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  return { pdf, loading, error };
}