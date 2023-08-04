import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/Layout/MainPageProfile.module.scss';

const MainPageProfile = () => {
  const user = useRecoilValue(userState);
  const tierImageUri =
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/sangmipa-0a8bc4cc-14a3-4d3a-bea9-cfea82bc5fb4.jpeg';
  return (
    <div className={styles.mainPageProfile}>
      <div className={styles.gridContainer}>
        <Link
          className={styles.myImage}
          href={`/users/detail?intraId=${user.intraId}`}
        >
          <PlayerImage
            src={user.userImageUri}
            styleName={'mainPageProfile'}
            size={18}
          />
        </Link>
        <div className={styles.userGreetings}>
          <div className={styles.greetings}>안녕하세요,</div>
          <div className={styles.intraId}>
            <PlayerImage src={tierImageUri} styleName={'ranktier'} size={50} />
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
