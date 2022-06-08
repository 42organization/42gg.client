import React from "react";
import styles from "../../styles/RankList.module.css";
import { Rank } from "../../types/rankTypes";
import RankItem from "./RankItem";

type RankType = {
  rankList: Rank[];
};

export default function RankList({ rankList }: RankType) {
  return (
    <div>
      <div className={styles.title}>Ranking</div>
      <div className={styles.container}>
        <div className={styles.division}>
          <div className={styles.rank}>랭킹</div>
          <div className={styles.userId}>유저 (점수)</div>
          <div className={styles.statusMessage}>상태메시지</div>
          <div className={styles.winRate}>승률</div>
        </div>
        {rankList.map((item) => (
          <RankItem key={item.userId} user={item} />
        ))}
      </div>
    </div>
  );
}
