import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import useInterval from 'hooks/useInterval';
import styles from 'styles/main/TournamentPreview/TournamentPreview.module.scss';
import TournamentPreviewItem from './TournamentPreviewItem';

export default function TournamentPreview() {
  const [tournamentList, setTournamentList] = useState<TournamentInfo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const router = useRouter();
  const setError = useSetRecoilState(errorState);

  const fetchTournamentList = useCallback(async () => {
    try {
      const liveRes = await instance.get(
        '/pingpong/tournaments?page=1&status=LIVE'
      );
      const beforeRes = await instance.get(
        '/pingpong/tournaments?page=1&status=BEFORE'
      );
      const joinedRes = [
        ...liveRes.data.tournaments,
        ...beforeRes.data.tournaments,
      ];
      setTournamentList(joinedRes);
    } catch (e: any) {
      setError('JC04');
    }
  }, [setError]);

  useEffect(() => {
    fetchTournamentList();
  }, [fetchTournamentList]);

  useInterval(() => {
    if (tournamentList.length === 0) {
      return;
    }
    const nextIndex = (selectedIndex + 1) % tournamentList.length;
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
      {tournamentList.length > 0 && (
        <Virtuoso
          className={styles.virtuoso}
          totalCount={tournamentList.length}
          data={tournamentList}
          ref={virtuoso}
          itemContent={(index) => (
            <TournamentPreviewItem
              id={tournamentList[index].tournamentId}
              title={tournamentList[index].title}
              startTime={tournamentList[index].startTime}
              endTime={tournamentList[index].endTime}
              status={tournamentList[index].status}
            />
          )}
          style={{ height: '100%' }}
        />
      )}
    </div>
  );
}
