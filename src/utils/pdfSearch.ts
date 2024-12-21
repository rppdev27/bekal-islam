import { PDFDocumentProxy } from 'pdfjs-dist';
import { extractPageText } from './pdfTextExtractor';

export interface SearchResult {
  page: number;
  text: string;
  snippet: string;
}

export async function searchPDF(
  pdfDoc: PDFDocumentProxy,
  searchQuery: string
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const query = searchQuery.toLowerCase().trim();
  
  if (!query) return results;

  try {
    const numPages = pdfDoc.numPages;
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const text = await extractPageText(page);
      const lowerText = text.toLowerCase();
      
      let pos = lowerText.indexOf(query);
      while (pos !== -1) {
        const start = Math.max(0, pos - 50);
        const end = Math.min(text.length, pos + query.length + 50);
        const snippet = text.slice(start, end).trim();
        
        results.push({
          page: pageNum,
          text: query,
          snippet: `...${snippet}...`
        });
        
        pos = lowerText.indexOf(query, pos + 1);
      }
    }
  } catch (error) {
    console.error('Search error:', error);
  }

  return results;
}