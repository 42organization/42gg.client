import { useEffect, useRef } from 'react';
import { RiPingPongFill } from 'react-icons/ri';
import styles from 'styles/takgu/store/Inventory.module.scss';

type InfiniteScrollComponentProps = {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
};

export function InfiniteScrollComponent({
  fetchNextPage,
  hasNextPage,
}: InfiniteScrollComponentProps) {
  const interactionObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactionObserverRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(interactionObserverRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (!hasNextPage) return null;
  return (
    <div className={styles.loadIcon} ref={interactionObserverRef}>
      <RiPingPongFill />
    </div>
  );
}
