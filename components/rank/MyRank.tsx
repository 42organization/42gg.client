import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/recoil/main';
import styles from '../../styles/RankList.module.css';

export default function MyRank() {
  const userData = useRecoilValue(userState);
  return (
    <div>
      <div className={styles.myRank}>
        {`지금 나의 🏆 랭킹 ${userData?.myRank}`}
      </div>
    </div>
  );
}
