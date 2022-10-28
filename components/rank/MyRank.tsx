import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import styles from 'styles/rank/RankList.module.scss';

export default function MyRank() {
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);

  return (
    <div>
      {myRank && (
        <div className={styles.myRank}>
          {myRank === -1 ? (
            <span>💡 나의 순위가 정해지지 않았습니다 💡</span>
          ) : (
            <div>
              🚀🚀{' '}
              <span
                onClick={() => {
                  setIsScroll(true);
                }}
              >
                나의 순위 {myRank}위{' '}
              </span>
              바로가기 🚀🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}
