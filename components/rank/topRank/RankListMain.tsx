import { useRecoilValue } from 'recoil';
import { RankMode, NormalMode, Rank } from 'types/rankTypes';
import { userState } from 'utils/recoil/layout';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  rank?: Rank;
}

export default function RankListMain({ rank }: RankListMainProps) {
  const seasonMode = useRecoilValue(userState).seasonMode;
  const isSeasonNormal = seasonMode === 'normal';
  const mainTitle = isSeasonNormal ? 'Vip' : 'Champion';
  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.mainTitle}
				${isSeasonNormal ? styles.normal : styles.rank}`}
      >
        {mainTitle}
      </div>
      {rank?.rankList.map((item: NormalMode | RankMode) => (
        <RankListItemMain
          key={item.intraId}
          rankedUser={item}
          isSeasonNormal={isSeasonNormal}
        />
      ))}
    </div>
  );
}
