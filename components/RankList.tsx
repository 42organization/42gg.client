import React from "react";
import styles from "../styles/RankList.module.css";
import { Rank } from "./types";
import RankItem from "./RankItem";

type RankType = {
    ranking: Rank;
};

export default function RankList() {
    const test = {
        rank: 1,
        userId: "daekim",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    };

    return (
        <div>
            <div className={styles.title}>Ranking</div>
            <div className={styles.container}>
                <div className={styles.division}>
                    <div className={styles.rank}>랭킹</div>
                    <div className={styles.userId}>유저</div>
                    <div className={styles.ppp}>점수</div>
                </div>
                <RankItem user={test} />
            </div>
        </div>
    );
}
