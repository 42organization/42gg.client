import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/Error.module.scss';

export default function ErrorPage() {
  const [error, setError] = useRecoilState(errorState);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/`);
  }, []);

  const goHome = () => {
    setError('');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <div className={styles.title}>42GG</div>
        <div className={styles.error}>
          {error === 'DK404'
            ? '잘못된 요청입니다!'
            : '데이터 요청에 실패하였습니다.'}
          <div className={styles.errorCode}>({error})</div>
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
