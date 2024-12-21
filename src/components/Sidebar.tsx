import React, { useState } from 'react';
import { Search, Book, X } from 'lucide-react';
import { chapters } from '../data/chapters';
import clsx from 'clsx';

interface SidebarProps {
  currentPage: number;
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    if (window.innerWidth < 1024) { // Only close on mobile
      onToggle();
    }
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
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Search size={12}/>
              </button>
            </form>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <button
                    onClick={() => handlePageClick(chapter.page)}
                    className={clsx(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                      currentPage === chapter.page
                        ? "bg-green-50 text-green-600"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <chapter.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{chapter.title}</span>
                    <span className="text-gray-400 text-xs">{chapter.page}</span>
                  </button>
                  
                  {chapter.subchapters?.map((subchapter) => (
                    <button
                      key={subchapter.id}
                      onClick={() => handlePageClick(subchapter.page)}
                      className={clsx(
                        "w-full text-left pl-9 pr-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                        currentPage === subchapter.page
                          ? "bg-green-50 text-green-600"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <subchapter.icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{subchapter.title}</span>
                      <span className="text-gray-400 text-xs">{subchapter.page}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className="fixed right-8 bottom-8 z-40 lg:hidden px-4 py-2 bg-green-800 text-white text-sm font-medium hover:bg-green-900 transition-colors rounded-lg shadow-sm flex items-center gap-2"
      >
        
        {
          isOpen ? <X size={15} className='font-bold'/> : <><Book className="w-4 h-4" />
        Daftar Isi</>
        }
      </button>
    </>
  );
};