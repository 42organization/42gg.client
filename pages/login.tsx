import styles from 'styles/Login.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Login() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>{'42GG'}</div>
          <a
            href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`}
          >
            <div className={styles.buttons}>
              <div className={styles.positive}>
                <input type='button' value='로그인' />
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
