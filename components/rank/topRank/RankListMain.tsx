import { userImages } from 'types/rankTypes';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import useRankListMain from 'hooks/rank/useRankListMain';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  isMain: boolean;
  season?: number;
}

export default function RankListMain({ isMain, season }: RankListMainProps) {
  const Mode = useRecoilValue(colorToggleSelector);
  const [rank, setRanker] = useState<userImages[]>([]);
  const [page] = useState<number>(1);

  const makePathRanker = useMemo(() => {
    return `/pingpong/users/images?seasonId=${season}&mode=${Mode}`;
  }, [season, Mode]);

  useRankListMain({
    makePathRanker,
    setRanker: setRanker,
    toggleMode: Mode,
    page: page,
    season: season,
  });

  useEffect(() => {
    if (rank?.length === 3) {
      setRanker(rank);
    } else if (rank?.length === 2 && rank[0] !== undefined) {
      dummyRankList[0] = rank[0];
      dummyRankList[1] = rank[1];
      setRanker(dummyRankList);
    } else {
      setRanker(dummyRankList);
    }
  }, [rank, Mode]);

  const bangElements = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`${!isMain && styles.bang} ${
        Mode === 'NORMAL' && styles.normal
      }`}
    />
  ));

  return (
    <div>
      <div className={`${styles.bangContainer}`}>{bangElements}</div>
      <div className={`${styles.mainContainer} ${isMain && styles.isMain}`}>
        {rank !== undefined &&
          rank.map((item: userImages, index: number) => (
            <RankListItemMain
              key={index}
              user={item}
              rank={(index = index === 0 ? 2 : index === 2 ? 3 : 1)}
            />
          ))}
      </div>
    </div>
  );
}

const dummyRankList: userImages[] = [
  {
    intraId: 'intraId',
    tierImageUri: '',
    userImageUri: '',
  },
  {
    intraId: 'intraId',
    tierImageUri: '',
    userImageUri: '',
  },
  {
    intraId: 'intraId',
    tierImageUri: '',
    userImageUri: '',
  },
];
