import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';

interface MyRankProps {
  toggleMode: 'normal' | 'rank';
}

export default function MyRank({ toggleMode }: MyRankProps) {
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);
  const rankType = toggleMode === 'rank' ? 'rank' : 'vip';
  const isRanked = myRank[toggleMode] === -1 ? 'unrank' : 'rank';
  const content = {
    unrank: {
      style: '',
      message: [
        `나의 ${
          rankType + (toggleMode === 'rank' ? '가' : '이')
        } 정해지지 않았습니다`,
      ],
    },
    rank: {
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
