import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import TournamentCard from 'components/takgu/tournament/TournamentCard';
import useBeforeLiveTournamentData from 'hooks/takgu/tournament/useBeforeLiveTournamentData';
import useInterval from 'hooks/useInterval';
import styles from 'styles/takgu/main/TournamentPreview.module.scss';

export default function TournamentPreview() {
  const { data } = useBeforeLiveTournamentData();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const router = useRouter();

  const dataCombined = data
    ? [...data.beforeTournament, ...data.liveTournament]
    : [];

  useInterval(() => {
    if (!data || dataCombined.length === 0) {
      return;
    }
    const nextIndex = (selectedIndex + 1) % dataCombined.length;
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
      onClick={() => router.push('/takgu/tournament')}
    >
      <Virtuoso
        className={styles.virtuoso}
        totalCount={dataCombined.length}
        data={dataCombined}
        ref={virtuoso}
        itemContent={(index) => (
          <TournamentCard {...dataCombined[index]} page='main' />
        )}
        style={{ height: '100%' }}
      />
    </div>
  );
}
