import StyledButton from 'components/StyledButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/Login.module.scss';

function Login() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  const onLogin = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`
    );
  };

  const onKakaoLogin = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/kakao`
    );
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.logoContainer}>
            <div className={styles.logo1}>
              <Image src='/image/Playwith_logo.png' alt='Playwith_logo' fill />
            </div>
            <div className={styles.logo2}>
              <Image
                src='/image/42GG_neon_logo.png'
                alt='42GG_neon_logo'
                fill
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <StyledButton onClick={onLogin} width={'9rem'}>
              Sign in
            </StyledButton>
            <StyledButton onClick={onKakaoLogin} width={'9rem'}>
              kakao login
            </StyledButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
