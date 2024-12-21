import React from 'react';
import { Search, Menu, X, BookOpen } from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import clsx from 'clsx';

interface SidebarProps {
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  onSearch,
  isOpen,
  onToggle,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onToggle}
      />
      <div
        className={clsx(
          'fixed lg:static inset-y-0 left-0 w-64 bg-white border-r z-30 transform transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </form>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              Daftar Isi
            </h3>
            <TableOfContents 
              onPageSelect={onPageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 lg:hidden z-40 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
};