import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function useCountUp(target: number, duration = 2000, triggered = false) {
  const [count, setCount] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!triggered) return;

    progressRef.current = 0; // Reset progress when triggered
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      progressRef.current += step;
      if (progressRef.current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        const hasDecimals = target % 1 !== 0;
        setCount(hasDecimals
          ? Math.round(progressRef.current * 100) / 100
          : Math.round(progressRef.current)
        );
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, triggered]);

  return count;
}