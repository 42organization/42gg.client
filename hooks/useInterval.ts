import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef<() => void | undefined>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
