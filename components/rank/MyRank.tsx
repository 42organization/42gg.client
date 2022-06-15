import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { myRankPosition, isScrollState } from '../../utils/recoil/myRank';
import styles from '../../styles/RankList.module.css';

export default function MyRank() {
  const router = useRouter();
  const myRank = useRecoilValue(myRankPosition);
  const setIsScroll = useSetRecoilState(isScrollState);

  const onClick = () => {
    setIsScroll(true);
  };

  return (
    <div>
      <div className={styles.myRank} onClick={onClick}>
        {myRank ? `지금 나의 🏆 랭킹 ${myRank}` : null}
      </div>
    </div>
  );
}
