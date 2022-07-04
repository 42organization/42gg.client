import Link from 'next/link';
import { Rank } from 'types/rankTypes';
import styles from 'styles/RankList.module.scss';

type RankType = {
  myIntraId: string;
  index: number;
  user: Rank;
  isMain: boolean;
};

export default function RankItem({ myIntraId, index, user, isMain }: RankType) {
  const { rank, intraId, ppp, statusMessage, winRate } = user;

  return (
    <>
      {isMain ? (
        <div className={styles.mainData}>
          <div className={styles.rank}>{rank === -1 ? '-' : rank}</div>
          <div className={styles.intraId}>
            <Link href={`/users/${intraId}`}>
              <span>{intraId} </span>
            </Link>
            <Link href={`/users/${intraId}`}>
              <span className={styles.ppp}>({ppp})</span>
            </Link>
          </div>
          <div className={styles.statusMessage}>
            {statusMessage.length > 10
              ? `${statusMessage.slice(0, 10)}...`
              : statusMessage}
          </div>
        </div>
      ) : (
        <div className={styles.rankData}>
          <div
            className={`${index % 2 ? styles.even : styles.odd}
            ${intraId === myIntraId && styles.myself}`}
          >
            <div
              className={0 < rank && rank < 4 ? styles.topRank : styles.rank}
            >
              {rank === -1 ? '-' : rank}
            </div>
            <div className={styles.intraId}>
              <Link href={`/users/${intraId}`}>
                <span>{intraId} </span>
              </Link>
              <Link href={`/users/${intraId}`}>
                <span className={styles.ppp}>({ppp})</span>
              </Link>
            </div>
            <div className={styles.statusMessage}>
              {statusMessage.length > 20
                ? `${statusMessage.slice(0, 20)}...`
                : statusMessage}
            </div>
            <div className={styles.winRate}>{winRate}%</div>
          </div>
        </div>
      )}
    </>
  );
}
