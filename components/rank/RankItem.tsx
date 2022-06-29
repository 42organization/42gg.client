import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { Rank } from 'types/rankTypes';
import { myRankPosition } from 'utils/recoil/myRank';
import styles from 'styles/RankList.module.scss';

type RankType = {
  user: Rank;
  isMain: boolean;
};

export default function RankItem({ user, isMain }: RankType) {
  const { rank, userId, ppp, statusMessage, winRate } = user;
  const myRank = useRecoilValue(myRankPosition);

  return (
    <Link href={`/users/${userId}`}>
      {isMain ? (
        <div className={styles.mainData}>
          <div className={styles.rank}>{rank}</div>
          <div className={styles.userId}>
            <span>{userId}</span> <span className={styles.ppp}>({ppp})</span>
          </div>
          <div className={styles.winRate}>{winRate}%</div>
        </div>
      ) : (
        <div className={styles.rankData}>
          <div
            className={`${rank % 2 ? styles.odd : styles.even}
            ${rank === myRank && styles.myself}`}
          >
            <div className={rank < 4 ? styles.topRank : styles.rank}>
              {rank}
            </div>
            <div className={styles.userId}>
              <span>{userId}</span> <span className={styles.ppp}>({ppp})</span>
            </div>
            <div className={styles.statusMessage}>{statusMessage}</div>
            <div className={styles.winRate}>{winRate}%</div>
          </div>
        </div>
      )}
    </Link>
  );
}
