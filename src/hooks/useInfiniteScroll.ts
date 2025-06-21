import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasNext: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({ hasNext, loading, onLoadMore }: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNext || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [hasNext, loading, onLoadMore]);

  return { lastElementRef };
}
