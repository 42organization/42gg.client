import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';
import { ToggleMode } from 'types/rankTypes';

interface MyRankProp {
  toggleMode: ToggleMode;
}

// export default function MyRank(toggleMode: ToggleMode) {
export default function MyRank(prop: MyRankProp) {
  const { toggleMode } = prop;
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);
  const rankType = toggleMode === 'RANK' ? '랭크' : '열정';
  const isRanked = myRank[toggleMode] === -1 ? 'unrank' : 'RANK';
  const content = {
    unrank: {
      style: '',
      message: [
        `💡 나의 ${
          rankType + (toggleMode === 'RANK' ? '가' : '이')
        } 정해지지 않았습니다 💡`,
      ],
    },
    RANK: {
      style: styles.rank,
      message: [
        `🚀🚀 나의 ${rankType}`,
        ` ${myRank[toggleMode]}위`,
        ' 바로가기 🚀🚀',
      ],
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
