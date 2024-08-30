import Link from 'next/link';
import PlayerImage from 'components/takgu/PlayerImage';
import { useUser } from 'hooks/takgu/Layout/useUser';
import styles from 'styles/takgu/Layout/MainPageProfile.module.scss';

const MainPageProfile = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <div className={styles.mainPageProfile}>
      <div className={styles.pageContainer}>
        <Link
          className={styles.myImage}
          href={`/takgu/users/detail?intraId=${user.intraId}`}
        >
          <PlayerImage
            src={user.userImageUri}
            styleName={`mainPageProfile ${
              user.edgeType ? user.edgeType.toLowerCase() : 'basic'
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
            <Link href={`/takgu/users/detail?intraId=${user.intraId}`}>
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
