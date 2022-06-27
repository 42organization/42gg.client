import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Login.module.scss';

function Login() {
  const router = useRouter();

  const pageRedirect = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`
    );
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>{'42GG'}</div>
        {/* <a
          href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`}
        > */}
        <button className={styles.loginButton} onClick={pageRedirect}>
          로그인
        </button>
        {/* </a> */}
      </div>
    </>
  );
}

export default Login;
