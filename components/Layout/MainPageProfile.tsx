import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/Layout/MainPageProfile.module.scss';

const MainPageProfile = () => {
  const user = useRecoilValue(userState);
  return (
    <div className={styles.mainPageProfile}>
      <div className={styles.gridContainer}>
        <Link
          className={styles.myImage}
          href={`/users/detail?intraId=${user.intraId}`}
        >
          <PlayerImage
            src={user.userImageUri}
            styleName={`mainPageProfile ${
              user.edge ? user.edge.toLowerCase() : 'basic'
            }`}
            size={18}
          />
        </Link>
        <div className={styles.userGreetings}>
          <div className={styles.greetings}>안녕하세요,</div>
          <div className={styles.intraId}>
            <PlayerImage
              src={user.tierImageUri}
              styleName={'ranktier'}
              size={50}
            />
            &nbsp;
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
