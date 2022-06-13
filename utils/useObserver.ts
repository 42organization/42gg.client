import React, { useEffect } from 'react';

type GreetingProps = {
  target: React.MutableRefObject<null>;
  onIntersect: any;
};
export const useObserver = ({ target, onIntersect }: GreetingProps) => {
  const root = null;
  const rootMargin = '0px';
  const threshold = 1.0;
  useEffect(() => {
    let observer: any;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};
