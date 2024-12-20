export interface PDFPageInfo {
  pageNumber: number;
  totalPages: number;
}

export interface PDFViewerProps {
  url: string;
  onPageChange?: (pageInfo: PDFPageInfo) => void;
}

export interface PDFOutline {
  title: string;
  dest: any;
  items?: PDFOutline[];
}