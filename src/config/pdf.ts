import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js to use a local worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href;

export const pdfLib = pdfjsLib;