import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';
import { ToggleMode } from 'types/rankTypes';

interface MyRankProp {
  toggleMode: ToggleMode;
}

export default function MyRank(prop: MyRankProp) {
  const { toggleMode } = prop;
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
      className={`${styles.myRank} ${content[isRanked].style}`}
      onClick={myRankHandler}
    >
      {content[isRanked].message.map((e, index) => (
        <span key={index}>{e}</span>
      ))}
    </div>
  );
}
