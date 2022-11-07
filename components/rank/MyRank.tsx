import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myRankState, scrollState } from 'utils/recoil/myRank';
import { MatchMode } from 'types/mainType';
import styles from 'styles/rank/RankList.module.scss';

interface MyRankProps {
  mode: MatchMode;
}

export default function MyRank({ mode }: MyRankProps) {
  const myRank = useRecoilValue(myRankState);
  const setIsScroll = useSetRecoilState(scrollState);
  const rank = mode === 'rank' ? '순위' : '열정';

  return (
    <div>
      {myRank && (
        <div className={styles.myRank}>
          {myRank === -1 ? (
            <span>💡 나의 {rank}가 정해지지 않았습니다 💡</span>
          ) : (
            <div>
              🚀🚀{' '}
              <span
                onClick={() => {
                  setIsScroll(true);
                }}
              >
                나의 {rank} {myRank}위{' '}
              </span>
              바로가기 🚀🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}
