import { useEffect, useRef, useState, type RefObject } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
  onIntersect?: () => void;
}

/**
 * A simple and type-safe IntersectionObserver hook.
 *
 * Usage:
 * const loaderRef = useIntersectionObserver({ onIntersect: fetchNextPage })
 * <div ref={loaderRef} />
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
  onIntersect,
}: UseIntersectionObserverOptions): React.RefObject<T> {
  const ref = useRef<T>(null);
  const [, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && onIntersect) onIntersect();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, root, rootMargin, threshold, onIntersect]);

  return ref as RefObject<T>;
}
