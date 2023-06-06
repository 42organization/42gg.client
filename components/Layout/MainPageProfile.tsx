import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/Layout/MainPageProfile.module.scss';
import { openCurrentMatchState } from 'utils/recoil/match';
import CurrentMatch from './CurrentMatch';

const MainPageProfile = () => {
  const user = useRecoilValue(userState);
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  return (
    <div className={styles.mainPageProfile}>
      <div className={styles.currentMatch}>
        {openCurrentMatch && <CurrentMatch />}
      </div>
      <div className={styles.gridContainer}>
        <Link
          className={styles.myImage}
          href={`/users/detail?intraId=${user.intraId}`}
        >
          <PlayerImage
            src={user.userImageUrl}
            styleName={'mainPageProfile'}
            size={18}
          />
        </Link>
        <div className={styles.userGreetings}>
          <div className={styles.greetings}>안녕하세요,</div>
          <div className={styles.intraId}>
            탁구왕&nbsp;
            <Link href={`/users/detail?intraId=${user.intraId}`}>
              {user.intraId}
            </Link>
            님
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageProfile;
