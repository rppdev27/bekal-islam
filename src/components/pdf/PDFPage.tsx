import React, { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

interface PDFPageProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  containerWidth: number;
}

export function PDFPage({ pdf, pageNumber, containerWidth }: PDFPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState<PDFPageProxy | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      if (page) {
        page.cleanup();
      }
      const newPage = await pdf.getPage(pageNumber);
      setPage(newPage);
    };

    loadPage();
  }, [pdf, pageNumber]);

  useEffect(() => {
    if (!page || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const viewport = page.getViewport({ scale: 1.0 });
    const scale = (containerWidth - 48) / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    page.render({
      canvasContext: context,
      viewport: scaledViewport,
    });
  }, [page, containerWidth]);

  return (
    <div className="flex justify-center p-6">
      <canvas ref={canvasRef} className="shadow-lg" />
    </div>
  );
}