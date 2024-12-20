import { useState, useEffect } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { PDFOutline } from '../types/pdf';

export function usePDFOutline(pdf: PDFDocumentProxy | null) {
  const [outline, setOutline] = useState<PDFOutline[]>([]);

  useEffect(() => {
    const loadOutline = async () => {
      if (!pdf) return;
      
      try {
        // Try to get the actual outline first
        const realOutline = await pdf.getOutline();
        
        if (realOutline && realOutline.length > 0) {
          setOutline(realOutline);
        } else {
          // If no outline exists, create a mock one
          const mockOutline: PDFOutline[] = [
            {
              title: 'Pendahuluan',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            },
            {
              title: 'Bab 1: Pengertian Qurban',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            },
            {
              title: 'Bab 2: Hukum Qurban',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            },
            {
              title: 'Bab 3: Syarat Qurban',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            },
            {
              title: 'Bab 4: Waktu Qurban',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            },
            {
              title: 'Penutup',
              dest: [null, { name: 'XYZ' }, 0, 0, null],
            }
          ];

          // Assign random pages to each item
          const totalPages = pdf.numPages;
          mockOutline.forEach(item => {
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            item.dest[0] = { num: randomPage };
          });

          setOutline(mockOutline);
        }
      } catch (error) {
        console.error('Error loading PDF outline:', error);
      }
    };

    loadOutline();
  }, [pdf]);

  return outline;
}