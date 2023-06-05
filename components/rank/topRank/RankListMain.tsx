import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  rank?: Rank;
  isMain: boolean;
}

export default function RankListMain({ rank, isMain }: RankListMainProps) {
  return (
    <div className={`${styles.bangContainer2}`}>
      <div className={`${styles.bangContainer}`}>
        <div className={`${!isMain && styles.bang}`} />
        <div className={`${!isMain && styles.bang}`} />
        <div className={`${!isMain && styles.bang}`} />
      </div>
      <div className={`${styles.mainContainer} ${isMain && styles.isMain}`}>
        {rank?.rankList.map((item: NormalUser | RankUser) => (
          <RankListItemMain key={item.intraId} user={item} />
        ))}
      </div>
    </div>
  );
}
