import styles from 'styles/Login.module.scss';

function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>{'42GG'}</div>
          <a
            href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`}
          >
            <button className={styles.button}>로그인</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
