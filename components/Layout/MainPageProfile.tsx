import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/Layout/MainPageProfile.module.scss';
import { currentMatchState, openCurrentMatchState } from 'utils/recoil/match';
import CurrentMatch from './CurrentMatch';
import { gameTimeToString } from 'utils/handleTime';

const MainPageProfile = () => {
  const user = useRecoilValue(userState);
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);
  const currentMatchList = useRecoilValue(currentMatchState).match;

  const currentMatchBoard = currentMatchList.map((currentMatch) => {
    return currentMatch.isMatched
      ? `${gameTimeToString(currentMatch.startTime)}에 경기가 시작됩니다!`
      : `${gameTimeToString(currentMatch.startTime)} 참가자 기다리는 중...`;
  });

  return (
    <div className={styles.gridContainer}>
      <div className={styles.currentMatch}>
        {openCurrentMatch &&
          currentMatchList?.map((currentMatch, index) => (
            <CurrentMatch currentMatch={currentMatch} key={index} />
          ))}
      </div>
      <Link
        className={styles.myImage}
        href={`/users/detail?intraId=${user.intraId}`}
      >
        <PlayerImage
          src={user.userImageUrl}
          styleName={'mainPageProfile'}
          size={30}
        />
      </Link>
      <div className={styles.greetings}>안녕하세요,</div>
      <Link
        className={styles.intraId}
        href={`/users/detail?intraId=${user.intraId}`}
      >
        탁구왕 {user.intraId} 님
      </Link>

      {/* <div className={styles.currentMatchBoard}>
        <div className={styles.currentMatchBoardInner}>
          <div className={styles.currentMatchScroll}>
            <ul>
              {openCurrentMatch &&
                currentMatchBoard.map((currentMatch, index) => (
                  <li key={index}>{currentMatch}</li>
                ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainPageProfile;
