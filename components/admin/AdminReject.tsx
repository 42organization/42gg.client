import router from 'next/router';
import React from 'react';
import styles from 'styles/admin/AdminReject.module.scss';

export default function AdminReject() {
  const goHome = () => {
    router.push('/takgu');
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>42GG</div>
        <div className={styles.content}>접근 권한이 없는 페이지입니다 !</div>
        <div className={styles.home} onClick={goHome}>
          <div className={styles.positive}>
            <input type='button' value='🏠 홈으로 🏠' />
          </div>
        </div>
      </div>
    </div>
  );
}
