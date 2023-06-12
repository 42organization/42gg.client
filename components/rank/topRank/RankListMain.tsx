import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';
interface RankListMainProps {
  rank?: Rank;
  isMain: boolean;
}

export default function RankListMain({ rank, isMain }: RankListMainProps) {
  const bangElements = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`${rank?.rankList[1].rank === 1 && !isMain && styles.bang}`}
    />
  ));

  return (
    <div>
      <div className={`${styles.bangContainer}`}>{bangElements}</div>
      <div className={`${styles.mainContainer} ${isMain && styles.isMain}`}>
        {rank?.rankList.map((item: NormalUser | RankUser) => (
          <RankListItemMain key={item.intraId} user={item} />
        ))}
      </div>
    </div>
  );
}
