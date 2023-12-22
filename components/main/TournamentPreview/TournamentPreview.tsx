import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { TournamentInfo } from 'types/tournamentTypes';
import TournamentCard from 'components/tournament/TournamentCard';
import useBeforeLiveTournamentData from 'hooks/tournament/useBeforeLiveTournamentData';
import useInterval from 'hooks/useInterval';
import styles from 'styles/main/TournamentPreview/TournamentPreview.module.scss';
import TournamentPreviewItem from './TournamentPreviewItem';

export default function TournamentPreview() {
  const data: TournamentInfo[] | undefined = useBeforeLiveTournamentData();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const router = useRouter();

  useInterval(() => {
    if (!data || data?.length === 0) {
      return;
    }
    const nextIndex = (selectedIndex + 1) % data.length;
    setSelectedIndex(nextIndex);
    if (virtuoso.current !== null) {
      virtuoso.current.scrollToIndex({
        index: nextIndex,
        align: 'start',
        behavior: 'smooth',
      });
    }
  }, 5000);

  return (
    <div
      className={styles.rollingBanner}
      onClick={() => router.push('tournament')}
    >
      {data && data.length > 0 && (
        <Virtuoso
          className={styles.virtuoso}
          totalCount={data.length}
          data={data}
          ref={virtuoso}
          itemContent={(index) => (
            <TournamentCard {...data[index]} page='main' />
          )}
          style={{ height: '100%' }}
        />
      )}
    </div>
  );
}
