import { RankUser, NormalUser, Rank } from 'types/rankTypes';
import RankListItemMain from './RankListItemMain';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListMainProps {
  rank?: Rank;
}

export default function RankListMain({ rank }: RankListMainProps) {
  //const isNormalSeason = seasonMode === 'normal';
  const isNormalSeason = false;
  const content = {
    normal: { style: styles.normal, title: 'VIP' },
    rank: { style: '', title: 'Champion' },
    both: { style: '', title: 'Champion' },
  };

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.title} ${content.rank.style}`}>
        {content.rank.title}
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
