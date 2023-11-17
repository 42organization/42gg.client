import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { TournamentInfo } from 'types/tournamentTypes';
import useAxiosGet from 'hooks/useAxiosGet';
import useInterval from 'hooks/useInterval';
import styles from 'styles/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId?: number;
  content: string;
  intraId: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type MegaphoneList = Array<IMegaphoneContent>;

// type MegaphoneContainerProps = {
//   children: React.ReactNode;
//   count: number;
// };

// const adminContent: IMegaphoneContent = {
//   megaphoneId: 0,
//   content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
//   intraId: '관리자',
// };

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

  const getTournamentListHandler = useAxiosGet<any>({
    url: `http://localhost:3000/api/pingpong/tournaments?page=1&status=예정&size=5`,
    setState: (data) => {
      setTournamentList(data.tournaments);
    },
    err: 'JJH',
    type: 'setError',
  });

  const goTournamentPage = (event: React.MouseEvent<HTMLDivElement>) => {
    router.push('tournament');
  };
  // const getMegaphoneHandler = useAxiosGet<any>({
  //   url: `/pingpong/megaphones`,
  //   setState: setContents,
  //   err: 'HJ01',
  //   type: 'setError',
  // });

  // useEffect(() => {
  //   getMegaphoneHandler();
  // }, [presentPath]);

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
