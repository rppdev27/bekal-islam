import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface PDFSearchProps {
  onSearch: (query: string) => void;
  results: Array<{ pageNumber: number; text: string }>;
  onResultClick: (pageNumber: number) => void;
  searching: boolean;
}

export function PDFSearch({ onSearch, results, onResultClick, searching }: PDFSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PDF..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {searching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => onResultClick(result.pageNumber)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
            >
              <div className="font-medium text-sm text-gray-600">Page {result.pageNumber}</div>
              <div className="text-sm text-gray-500 truncate">
                ...{result.text}...
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}