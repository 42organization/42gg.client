import React from 'react';
import styles from '../../styles/RankList.module.css';
import { Rank } from '../../types/rankTypes';

type RankType = {
  user: Rank;
};

export default function RankItem({ user }: RankType) {
  const { rank, userId, ppp, statusMessage, winRate } = user;
  return (
    <div className={styles.person}>
      <div className={styles.rank}>{rank}</div>
      <div className={styles.userId}>{`${userId} (${ppp})`}</div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.winRate}>{winRate}</div>
    </div>
  );
}
