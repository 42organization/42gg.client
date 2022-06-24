import React from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { myRankPosition, isScrollState } from '../../utils/recoil/myRank';
import styles from '../../styles/RankList.module.scss';

export default function MyRank() {
  const router = useRouter();
  const myRank = useRecoilValue(myRankPosition);
  const setIsScroll = useSetRecoilState(isScrollState);

  const onClick = () => {
    setIsScroll(true);
  };

  return (
    <div className={styles.myRankContainer}>
      <div className={styles.myRank} onClick={onClick}>
        {myRank && `지금 나의 👑 랭킹 ${myRank}`}
      </div>
    </div>
  );
}
