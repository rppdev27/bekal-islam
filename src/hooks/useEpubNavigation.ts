import { useCallback } from 'react';

export function useEpubNavigation(rendition: any) {
  const nextPage = useCallback(() => {
    rendition?.next();
  }, [rendition]);

  const prevPage = useCallback(() => {
    rendition?.prev();
  }, [rendition]);

  const jumpToChapter = useCallback((href: string) => {
    return rendition?.display(href);
  }, [rendition]);

  return {
    nextPage,
    prevPage,
    jumpToChapter
  };
}