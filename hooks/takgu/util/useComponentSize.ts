import { useState, useLayoutEffect, useRef } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export default function useComponentSize<T extends HTMLElement>(): [
  React.RefObject<T>,
  Size
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  return [ref, size];
}
