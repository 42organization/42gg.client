import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/Layout/MainPageProfile.module.scss';
import { currentMatchState, openCurrentMatchState } from 'utils/recoil/match';
import CurrentMatch from './CurrentMatch';

const MainPageProfile = () => {
  const user = useRecoilValue(userState);
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);
  const currentMatchList = useRecoilValue(currentMatchState).match;

  return (
    <div className={styles.gridContainer}>
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
      <div className={styles.greetings}>안녕하세요</div>
      <Link
        className={styles.intraId}
        href={`/users/detail?intraId=${user.intraId}`}
      >
        탁구왕 {user.intraId} 님
      </Link>
      <div className={styles.currentMatch}>
        {openCurrentMatch &&
          currentMatchList?.map((currentMatch, index) => (
            <CurrentMatch currentMatch={currentMatch} key={index} />
          ))}
      </div>
    </div>
  );
};

export default MainPageProfile;
