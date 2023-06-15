import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';
import { useEffect, useState } from 'react';
interface RankListMainProps {
  rank?: Rank;
  isMain: boolean;
}

export default function RankListMain({ rank, isMain }: RankListMainProps) {
  const [rankList, setRankList] = useState<NormalUser[] | RankUser[]>([]);

  useEffect(() => {
    if (rank?.rankList.length === 3) {
      setRankList(rank.rankList);
    } else if (rank?.rankList.length === 2) {
      dummyRankList[0] = rank.rankList[0];
      dummyRankList[1] = rank.rankList[1];
      setRankList(dummyRankList);
    } else {
      setRankList(dummyRankList);
    }
  }, [rank]);

  const bangElements = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className={`${!isMain && styles.bang}`} />
  ));

  return (
    <div>
      <div className={`${styles.bangContainer}`}>{bangElements}</div>
      <div className={`${styles.mainContainer} ${isMain && styles.isMain}`}>
        {rankList.map((item: NormalUser | RankUser) => (
          <RankListItemMain key={item.intraId} user={item} />
        ))}
      </div>
    </div>
  );
}

const dummyRankList: RankUser[] | NormalUser[] = [
  {
    rank: 2,
    intraId: 'intraId',
    statusMessage: 'Hi',
    ppp: 100,
    userImageUri: '',
  },
  {
    rank: 1,
    intraId: 'intraId',
    statusMessage: 'Hi',
    ppp: 90,
    userImageUri: '',
  },
  {
    rank: 3,
    intraId: 'intraId',
    statusMessage: 'Hi',
    ppp: 80,
    userImageUri: '',
  },
];
