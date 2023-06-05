import Link from 'next/link';
import { RankUser, NormalUser } from 'types/rankTypes';
import styles from 'styles/rank/RankListMain.module.scss';
import PlayerImage from 'components/PlayerImage';

interface RankListItemMainProps {
  user: NormalUser | RankUser;
}

export default function RankListItemMain({ user }: RankListItemMainProps) {
  const { rank, intraId, userImageUri } = user;
  const rankFiltered = rank < 0 ? '-' : rank;

  return (
    <div className={`${styles.mainData}`}>
      <div className={rank === 1 ? styles.leaf : ''}>
        <div className={rank === 1 ? styles.leaf1 : ''}>
          <div className={styles.intraId}>
            <Link href={`users/detail?intraId=${intraId}`}>
              <PlayerImage
                src={userImageUri}
                styleName={rank === 1 ? 'ranktropy' : 'gameResultBig'}
                size={50}
              />
              <span>{intraId}</span>
            </Link>
          </div>
          <div
            className={
              rank === 1
                ? styles.rankNumber1
                : rank === 2
                ? styles.rankNumber2
                : styles.rankNumber3
            }
          >
            {rankFiltered}
          </div>
        </div>
      </div>
    </div>
  );
}
