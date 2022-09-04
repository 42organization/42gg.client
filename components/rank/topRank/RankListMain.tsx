import { useRecoilValue } from 'recoil';
import { RankMode, NormalMode, Rank } from 'types/rankTypes';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';
import RankListItemMain from './RankListItemMain';

interface RankListMainProps {
  rank?: Rank;
}

export default function RankListMain({ rank }: RankListMainProps) {
  const seasonMode = useRecoilValue(userState).seasonMode;
  const mainTitle = seasonMode === 'normal' ? 'Vip' : 'Champion';
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>{mainTitle}</div>
      {rank?.rankList.map((item: NormalMode | RankMode) => (
        <RankListItemMain key={item.intraId} rankedUser={item} />
      ))}
    </div>
  );
}
