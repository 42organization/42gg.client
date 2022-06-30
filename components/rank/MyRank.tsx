import { useSetRecoilState, useRecoilValue } from 'recoil';
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
      {myRank && (
        <div className={styles.myRank}>
          {myRank === -1 ? (
            <span> 💡 나의 순위가 정해지지 않았습니다 💡</span>
          ) : (
            <div onClick={onClick}>
              <span>🚀🚀 나의 순위 {myRank} </span>
              바로가기 🚀🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}
