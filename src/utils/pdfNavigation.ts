import type { PDFDocumentProxy } from 'pdfjs-dist';

interface PDFDestination {
  num?: number;
  gen?: number;
  name?: string;
}

export async function navigateToDestination(
  pdf: PDFDocumentProxy,
  dest: string | PDFDestination[] | null
): Promise<number> {
  if (!dest) {
    return 1;
  }

  try {
    // Case 1: Named destination (string)
    if (typeof dest === 'string') {
      const destination = await pdf.getDestination(dest);
      if (!destination?.[0]) return 1;
      const pageIndex = await pdf.getPageIndex(destination[0]);
      return pageIndex + 1;
    }

    // Case 2: Explicit destination array
    if (Array.isArray(dest) && dest.length > 0) {
      // Case 2a: Direct page number
      if (dest[0]?.num !== undefined) {
        return Math.max(1, Math.min(dest[0].num, pdf.numPages));
      }

      // Case 2b: Page reference
      if (dest[0]) {
        const pageIndex = await pdf.getPageIndex(dest[0]);
        return Math.max(1, Math.min(pageIndex + 1, pdf.numPages));
      }
    }

    return 1;
  } catch (error) {
    console.warn('PDF navigation fallback to first page:', error);
    return 1;
  }
}