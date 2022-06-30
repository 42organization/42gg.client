import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { Rank } from 'types/rankTypes';
import { myRankPosition } from 'utils/recoil/myRank';
import styles from 'styles/RankList.module.scss';

type RankType = {
  index: number;
  user: Rank;
  isMain: boolean;
};

export default function RankItem({ index, user, isMain }: RankType) {
  const { rank, intraId, ppp, statusMessage, winRate } = user;
  const myRank = useRecoilValue(myRankPosition);

  return (
    <Link href={`/users/${intraId}`}>
      {isMain ? (
        <div className={styles.mainData}>
          <div className={styles.rank}>{rank === -1 ? '-' : rank}</div>
          <div className={styles.intraId}>
            <span>{intraId}</span> <span className={styles.ppp}>({ppp})</span>
          </div>
          <div className={styles.winRate}>{winRate}%</div>
        </div>
      ) : (
        <div className={styles.rankData}>
          <div
            className={`${index % 2 ? styles.even : styles.odd}
            ${rank === myRank && styles.myself}`}
          >
            <div
              className={0 < rank && rank < 4 ? styles.topRank : styles.rank}
            >
              {rank === -1 ? '-' : rank}
            </div>
            <div className={styles.intraId}>
              <span>{intraId}</span> <span className={styles.ppp}>({ppp})</span>
            </div>
            <div className={styles.statusMessage}>{statusMessage}</div>
            <div className={styles.winRate}>{winRate}%</div>
          </div>
        </div>
      )}
    </Link>
  );
}
