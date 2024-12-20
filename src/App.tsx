import React from 'react';
import { PDFViewer } from './components/pdf/PDFViewer';

const PDF_URL = 'https://menicapro.s3.ap-southeast-1.amazonaws.com/%2311+-+Fiqih+Qurban+Di+Masa+Pandemi.pdf';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen">
        <PDFViewer url={PDF_URL} />
      </div>
    </div>
  );
}

export default App;