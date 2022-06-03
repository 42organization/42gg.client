import React from "react";
import styles from "../styles/RankList.module.css";
import { Rank } from "./types";

type RankType = {
    user: Rank;
};

export default function RankItem({ user }: RankType) {
    return (
        <div className={styles.person}>
            <div className={styles.rank}>{user.rank}</div>
            <div className={styles.userId}>{user.userId}</div>
            <div className={styles.ppp}>{user.ppp}</div>
        </div>
    );
}
