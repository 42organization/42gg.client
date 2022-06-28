import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loginState, logoutModalState } from 'utils/recoil/login';
import styles from 'styles/modal/LogoutModal.module.scss';

export default function LogoutModal() {
  const setOpenModal = useSetRecoilState(logoutModalState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();

  const onReturn = () => {
    setOpenModal(false);
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
        <input
          className={styles.negative}
          onClick={onReturn}
          type='button'
          value='아니오'
        />
        <input
          className={styles.positive}
          onClick={onLogout}
          type='button'
          value='예'
        />
      </div>
    </div>
  );
}
