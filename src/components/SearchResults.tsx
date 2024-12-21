import React from 'react';
import { SearchResult } from '../utils/pdfSearch';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  onPageClick: (page: number) => void;
  isSearching: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  onPageClick,
  isSearching 
}) => {
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="mt-2 text-gray-600">Searching document...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Found {results.length} {results.length === 1 ? 'result' : 'results'}
      </p>
      
      {results.map((result, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => onPageClick(result.page)}
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-blue-600">Page {result.page}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPageClick(result.page);
              }}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Go to page
            </button>
          </div>
          
          <div className="text-sm text-gray-800 leading-relaxed">
            {result.snippet}
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            Klik untuk melihat konteks secara lengkap
          </p>
        </div>
      ))}
      
      {results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">Tidak ada konten yang ditemukan</p>
          <p className="text-sm text-gray-400">
          Coba gunakan kata kunci yang berbeda 
          </p>
        </div>
      )}
    </div>
  );
};