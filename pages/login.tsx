import StyledButton from 'components/StyledButton';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/Login.module.scss';

function Login() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  const login = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`
    );
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>{'42GG'}</div>
          <StyledButton onClick={login} width={'14rem'}>
            Sign In
          </StyledButton>
        </div>
      </div>
    </>
  );
}

export default Login;
