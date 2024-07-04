import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { TournamentInfo } from 'types/tournamentTypes';
import { instance } from 'utils/axios';
import useInterval from 'hooks/useInterval';
import styles from 'styles/takgu/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId?: number;
  content: string;
  intraId: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type MegaphoneList = Array<IMegaphoneContent>;

export const MegaphoneItem = ({
  content,
  intraId,
  onClick,
}: IMegaphoneContent) => {
  return (
    <div className={styles.contentWrapper} onClick={onClick}>
      <div className={styles.intraId}>{intraId}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

const TournamentMegaphone = () => {
  const [contents, setContents] = useState<MegaphoneList>([]);
  const [TournamentList, setTournamentList] = useState<TournamentInfo[]>([]);
  const [megaphoneData, setMegaphoneData] = useState<MegaphoneList>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const virtuoso = useRef<VirtuosoHandle>(null);
  const router = useRouter();

  function getTournamentListHandler() {
    // // FIXME : mockInstance 사용 중이었던 점 확인 필요함
    return instance.get(`tournament?page=1&status=예정&size=5`).then((res) => {
      setTournamentList(res.data.tournaments);
    });
  }

  const goTournamentPage = (event: React.MouseEvent<HTMLDivElement>) => {
    router.push('/takgu/tournament');
  };

  useEffect(() => {
    if (contents.length === 0) getTournamentListHandler();
  }, [contents]);

  useEffect(() => {
    if (contents.length > 0) setMegaphoneData([...contents]);
    else {
      setMegaphoneData([
        ...TournamentList.map(
          (item): IMegaphoneContent => ({
            megaphoneId: item.tournamentId,
            content: item.title,
            intraId: item.startTime.toString().split(':').slice(0, 2).join(':'),
            onClick: goTournamentPage,
          })
        ),
      ]);
    }
  }, [contents, TournamentList]);

  useInterval(() => {
    if (!megaphoneData) return;
    const nextIndex = (selectedIndex + 1) % megaphoneData.length;
    setSelectedIndex(nextIndex);
    if (virtuoso.current !== null)
      virtuoso.current.scrollToIndex({
        index: nextIndex,
        align: 'start',
        behavior: 'smooth',
      });
  }, 4000);

  return (
    <div className={styles.rollingBanner}>
      <div className={styles.wrapper}>
        {!!megaphoneData && megaphoneData.length > 0 && (
          <Virtuoso
            className={styles.virtuoso}
            totalCount={megaphoneData.length}
            data={megaphoneData}
            ref={virtuoso}
            itemContent={(index) => (
              <MegaphoneItem
                content={megaphoneData[index].content}
                intraId={megaphoneData[index].intraId}
                onClick={goTournamentPage}
              />
            )}
            style={{ height: '100%' }}
          />
        )}
      </div>
    </div>
  );
};

export default TournamentMegaphone;
