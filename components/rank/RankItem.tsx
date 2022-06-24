import React from 'react';
import Link from 'next/link';
import styles from '../../styles/RankList.module.scss';
import { Rank } from '../../types/rankTypes';
import { useRecoilValue } from 'recoil';
import { myRankPosition } from '../../utils/recoil/myRank';

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
        <div className={styles.mainPerson}>
          <div className={styles.mainRank}>{rank}</div>
          <div className={styles.mainUserId}>
            <span>{userId}</span>{' '}
            <span className={styles.mainPpp}>({ppp})</span>
          </div>
          <div className={styles.mainWinRate}>{winRate}</div>
        </div>
      ) : (
        <div
          className={`${rank % 2 ? styles.oddPerson : styles.evenPerson}
            ${rank === myRank && styles.myPerson}`}
        >
          <div className={rank < 4 ? styles.topRank : styles.rank}>{rank}</div>
          <div className={styles.userId}>
            <span>{userId}</span> <span className={styles.ppp}>({ppp})</span>
          </div>
          <div className={styles.statusMessage}>{statusMessage}</div>
          <div className={styles.winRate}>{winRate}</div>
        </div>
      )}
    </Link>
  );
}
