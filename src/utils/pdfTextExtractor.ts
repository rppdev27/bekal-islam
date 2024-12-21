import { PDFPageProxy } from 'pdfjs-dist';

export async function extractPageText(page: PDFPageProxy): Promise<string> {
  try {
    const textContent = await page.getTextContent();
    const textItems = textContent.items.map((item: any) => 'str' in item ? item.str : '');
    return textItems.join(' ');
  } catch (error) {
    console.error('Error extracting text:', error);
    return '';
  }
}