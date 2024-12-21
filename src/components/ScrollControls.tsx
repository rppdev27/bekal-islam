import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ScrollControlsProps {
  onScrollUp: () => void;
  onScrollDown: () => void;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({ onScrollUp, onScrollDown }) => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      <button
        onClick={onScrollUp}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Scroll up"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
      <button
        onClick={onScrollDown}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
};