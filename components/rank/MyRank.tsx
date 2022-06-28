import React from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { myRankPosition, isScrollState } from 'utils/recoil/myRank';
import styles from 'styles/RankList.module.scss';

export default function MyRank() {
  const myRank = useRecoilValue(myRankPosition);
  const setIsScroll = useSetRecoilState(isScrollState);

  const onClick = () => {
    setIsScroll(true);
  };

  return (
    <div>
      <div className={styles.myRank} onClick={onClick}>
        {myRank && (
          <>
            <span>{`🚀🚀 나의 순위 ${myRank} `}</span>
            바로가기 🚀🚀
          </>
        )}
      </div>
    </div>
  );
}
