import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { isEditProfileState } from 'utils/recoil/user';
import Chart from 'components/user/Chart';
import Profile from 'components/user/Profile';
import EditProfile from 'components/user/EditProfile';
import GameResult from 'components/game/GameResult';
import styles from 'styles/user/user.module.scss';
import Modal from 'components/modal/Modal';

export default function user() {
  const router = useRouter();
  const { userId } = router.query;
  const isEditProfile = useRecoilValue(isEditProfileState);

  return (
    <div className={styles.container}>
      {typeof userId === 'string' && (
        <>
          <h1 className={styles.title}>{userId}</h1>
          <Profile userId={userId}></Profile>
          <Chart userId={userId}></Chart>
          {/* <GameResult /> */}
        </>
      )}
      {isEditProfile && (
        <Modal>
          <EditProfile />
        </Modal>
      )}
    </div>
  );
}
