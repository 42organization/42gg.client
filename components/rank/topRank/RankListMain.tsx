import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  rank?: Rank;
  isMain: boolean;
}

export default function RankListMain({ rank, isMain }: RankListMainProps) {
  const content = {
    normal: { style: styles.normal, title: 'VIP' },
    rank: { style: '', title: 'Champion' },
    both: { style: '', title: 'Champion' },
  };
  //console.log(rank);
  return (
    <div>
      <div className={`${styles.title} ${content.rank.style}`}>
        {content.rank.title}
      </div>
      <div className={`${styles.mainContainer} ${isMain && styles.isMain}`}>
        {rank?.rankList.map((item: NormalUser | RankUser) => (
          <RankListItemMain key={item.intraId} user={item} />
        ))}
      </div>
    </div>
  );
}
