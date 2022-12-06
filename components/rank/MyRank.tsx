import { useRecoilState, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { myRankState, pageState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';

interface MyRankProps {
  toggleMode: MatchMode;
}

export default function MyRank({ toggleMode }: MyRankProps) {
  const [myRank, setMyRank] = useRecoilState(myRankState);
  const setPage = useSetRecoilState(pageState);
  const rankType = toggleMode === 'rank' ? '랭크' : '열정';
  const isRanked = myRank[toggleMode] === -1 ? 'unrank' : 'rank';
  const content = {
    unrank: {
      style: '',
      message: [
        `💡 나의 ${
          rankType + (toggleMode === 'rank' ? '가' : '이')
        } 정해지지 않았습니다 💡`,
      ],
    },
    rank: {
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
    setMyRank((prev) => ({ ...prev, clicked: true }));
    setPage(Math.ceil(myRank[toggleMode] / 20));
  };

  return (
    <div
      className={`${styles.myRank} ${content[isRanked].style}`}
      onClick={myRankHandler}
    >
      {myRank[toggleMode] !== 0 &&
        content[isRanked].message.map((e, index) => (
          <span key={index}>{e}</span>
        ))}
    </div>
  );
}
