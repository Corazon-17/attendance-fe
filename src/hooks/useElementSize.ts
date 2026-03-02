import { useEffect, useRef, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef<T | null>(null);

  const callbackRef = (node: T | null) => {
    elementRef.current = node;
  };

  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!resizeObserver.current) {
      resizeObserver.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        const { width, height } = entry.target.getBoundingClientRect();
        setSize({ width, height });
      });
    }

    const observer = resizeObserver.current;
    const el = elementRef.current;

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return [callbackRef, size] as const;
}
