import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/LogoutModal.module.scss';

export default function LogoutModal() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setModalInfo = useSetRecoilState(modalState);
  const router = useRouter();

  const onReturn = () => {
    setModalInfo({ modalName: null });
  };

  const onLogout = () => {
    localStorage.removeItem('42gg-token');
    setIsLoggedIn(false);
    router.push(`/`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🥲</div>
        <div>
          로그아웃
          <br />
          하시겠습니까?
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onReturn} type='button' value='아니오' />
        </div>
        <div className={styles.positive}>
          <input onClick={onLogout} type='button' value='예' />
        </div>
      </div>
    </div>
  );
}
