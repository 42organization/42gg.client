import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/modal';
import Login from 'pages/login';
import styles from 'styles/Error.module.scss';

export default function ErrorPage() {
  const [errorMessage, setErrorMessage] = useRecoilState(errorState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setModalInfo = useSetRecoilState(modalState);
  const router = useRouter();

  useEffect(() => {
    if (errorMessage === 'DK303') {
      localStorage.removeItem('42gg-token');
      setIsLoggedIn(false);
    }
    setModalInfo({ modalName: null });
    router.replace(`/`);
  }, []);

  const goHome = () => {
    setErrorMessage('');
    router.push('/');
  };

  if (errorMessage === 'DK303') {
    return <Login />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.title}>42gg</div>
          <div className={styles.errorMessage}>
            {errorMessage === 'DK404'
              ? '잘못된 요청입니다!'
              : '데이터 요청에 실패하였습니다.'}
            <div className={styles.errorCode}>({errorMessage})</div>
          </div>
          <div className={styles.home} onClick={goHome}>
            <div className={styles.positive}>
              <input type='button' value='🏠 홈으로 🏠' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
