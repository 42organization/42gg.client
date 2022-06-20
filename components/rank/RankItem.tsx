import React from 'react';
import Link from 'next/link';
import styles from '../../styles/RankList.module.css';
import { Rank } from '../../types/rankTypes';

type RankType = {
  user: Rank;
  isMain: boolean;
};

export default function RankItem({ user, isMain }: RankType) {
  const { rank, userId, ppp, statusMessage, winRate } = user;
  return (
    <Link href={`/users/${userId}`}>
      <div className={styles.person}>
        {isMain ? (
          <>
            <div className={styles.mainRank}>{rank}</div>
            <div className={styles.mainUserId}>{userId}</div>
            <div className={styles.mainPpp}>{ppp}</div>
          </>
        ) : (
          <>
            <div className={styles.rank}>{rank}</div>
            <div className={styles.userId}>{`${userId} (${ppp})`}</div>
            <div className={styles.statusMessage}>{statusMessage}</div>
            <div className={styles.winRate}>{winRate}</div>
          </>
        )}
      </div>
    </Link>
  );
}
