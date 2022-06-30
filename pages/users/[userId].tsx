import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { isEditProfileState } from 'utils/recoil/user';
import Chart from 'components/user/Chart';
import Profile from 'components/user/Profile';
import EditProfileModal from 'components/modal/EditProfileModal';
import GameResult from 'components/game/GameResult';
import styles from 'styles/user/user.module.scss';
import Modal from 'components/modal/Modal';

export default function user() {
  const router = useRouter();
  const { intraId } = router.query;
  const isEditProfile = useRecoilValue(isEditProfileState);

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <Profile intraId={intraId}></Profile>
          <Chart intraId={intraId}></Chart>
          <GameResult />
        </>
      )}
      {isEditProfile && (
        <Modal>
          <EditProfileModal />
        </Modal>
      )}
    </div>
  );
}
