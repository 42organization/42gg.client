import { useRecoilValue } from 'recoil';
import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import { seasonListState } from 'utils/recoil/seasons';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  rank?: Rank;
}

export default function RankListMain({ rank }: RankListMainProps) {
  const { seasonMode } = useRecoilValue(seasonListState);
  const isNormalSeason = seasonMode === 'normal';
  const mainTitle = isNormalSeason ? 'Vip' : 'Champion';

  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.mainTitle}
				${isNormalSeason ? styles.normal : styles.rank}`}
      >
        {mainTitle}
      </div>
      {rank?.rankList.map((item: NormalUser | RankUser) => (
        <RankListItemMain
          key={item.intraId}
          user={item}
          isSeasonNormal={isNormalSeason}
        />
      ))}
    </div>
  );
}
