import React from "react";
import styles from "../styles/RankList.module.css";
import { Rank } from "../types/types";
import RankItem from "./RankItem";

type RankType = {
    ranking: Rank;
};

const list = [
    {
        rank: 1,
        userId: "daekim0",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
    {
        rank: 1,
        userId: "daekim1",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
    {
        rank: 1,
        userId: "daekim2",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
    {
        rank: 1,
        userId: "daekim3",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
    {
        rank: 1,
        userId: "daekim4",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
    {
        rank: 1,
        userId: "daekim5",
        ppp: 42,
        statusMessage: "연습 중",
        winRate: 1,
    },
]

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
                {list.map((item) => (<RankItem key={item.userId} user={item} />))}
            </div>
        </div>
    );
}
