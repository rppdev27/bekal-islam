import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useEpubNavigation } from '../../hooks/useEpubNavigation';

interface EpubControlsProps {
  rendition: any;
  disabled: boolean;
}

export function EpubControls({ rendition, disabled }: EpubControlsProps) {
  const { nextPage, prevPage } = useEpubNavigation(rendition);

  return (
    <>
      <Button
        variant="ghost"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        onClick={prevPage}
        disabled={disabled}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        onClick={nextPage}
        disabled={disabled}
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </>
  );
}