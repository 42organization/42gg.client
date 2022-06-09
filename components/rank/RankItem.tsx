import React from 'react';
import styles from '../../styles/RankList.module.css';
import { Rank } from '../../types/rankTypes';

type RankType = {
  user: Rank;
  count?: number;
};

export default function RankItem({ user, count }: RankType) {
  const { rank, userId, ppp, statusMessage, winRate } = user;
  if (count) {
    return (
      <div className={styles.person}>
        <div className={styles.mainrank}>{rank}</div>
        <div className={styles.mainuserId}>{userId}</div>
        <div className={styles.mainppp}>{ppp}</div>
      </div>
    );
  } else {
    return (
      <div className={styles.person}>
        <div className={styles.rank}>{rank}</div>
        <div className={styles.userId}>{`${userId} (${ppp})`}</div>
        <div className={styles.statusMessage}>{statusMessage}</div>
        <div className={styles.winRate}>{winRate}</div>
      </div>
    );
  }
}
