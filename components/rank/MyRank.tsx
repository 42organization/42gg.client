import { useSetRecoilState, useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';

interface MyRankProps {
  mode: MatchMode;
}

export default function MyRank({ mode }: MyRankProps) {
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);
  const rankType = mode === 'rank' ? '순위' : '열정';
  const messageType = myRank === -1 ? 'rank' : 'unrank';
  const rankStyle = myRank === -1 ? styles.unrank : styles.rank;
  const message = {
    unrank: [`💡 나의 ${rankType}가 정해지지 않았습니다 💡`],
    rank: [`🚀🚀 나의 ${rankType}`, ` ${myRank}위`, ' 바로가기 🚀🚀'],
  };

  const myRankHandler = () => {
    if (myRank === -1) return;
    setIsScroll(true);
  };

  return (
    <div>
      {myRank && (
        <div
          className={`${styles.myRank} ${rankStyle}`}
          onClick={myRankHandler}
        >
          {message[messageType].map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
      )}
    </div>
  );
}
