import { useSetRecoilState, useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/takgu/colorMode';
import { myRankState, scrollState } from 'utils/recoil/takgu/myRank';
import styles from 'styles/takgu/rank/RankList.module.scss';

export default function MyRank() {
  const toggleMode = useRecoilValue(colorToggleSelector);
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
