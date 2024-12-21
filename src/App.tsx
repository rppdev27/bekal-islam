import { PDFViewer } from './components/PDFViewer';
import { books } from './data/books';

function App() {
  const book = books[0];

  return (
    <div className="h-screen">
      <PDFViewer url={book.url} />
    </div>
  );
}

export default App;