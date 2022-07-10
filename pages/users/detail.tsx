import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isEditProfileState } from 'utils/recoil/user';
import Chart from 'components/user/Chart';
import Profile from 'components/user/Profile';
import EditProfileModal from 'components/modal/EditProfileModal';
import GameResult from 'components/game/GameResult';
import styles from 'styles/user/user.module.scss';
import Modal from 'components/modal/Modal';
import { useEffect } from 'react';

export default function user() {
  const router = useRouter();
  const { intraId } = router.query;
  const [isEditProfile, setIsEditProfile] = useRecoilState(isEditProfileState);

  useEffect(() => {
    return setIsEditProfile(false);
  }, []);

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <Profile intraId={intraId} />
          <Chart intraId={intraId} />
          <GameResult intraId={intraId} />
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
