import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';
import { useContext } from 'react';
import { ToggleModeContext } from '../../pages/rank';

export default function MyRank() {
  const toggleMode = useContext(ToggleModeContext);
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);
  const rankType = toggleMode === 'RANK' ? 'rank' : 'vip';
  const isRanked = myRank[toggleMode] === -1 ? 'unrank' : 'RANK';

  const content = {
    unrank: {
      style: '',
      message: [`My ${rankType}:`, ` 00`],
    },
    RANK: {
      style: styles.rank,
      message: [`My ${rankType}:`, ` ${myRank[toggleMode]}`],
    },
  };

  const myRankHandler = () => {
    if (myRank[toggleMode] === -1) return;
    setIsScroll(true);
  };

  return (
    <div
      className={`${styles.myRank} ${content[isRanked].style} ${
        toggleMode === 'NORMAL' && styles.normal
      }`}
      onClick={myRankHandler}
    >
      {content[isRanked].message.map((e, index) => (
        <span key={index}>{e}</span>
      ))}
    </div>
  );
}
