import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { agendaErrorState } from 'utils/recoil/agendaError';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/takgu/modal';
import { useRouter } from 'next/router';
import useErrorPage from 'hooks/error/useErrorPage';
import styles from 'styles/takgu/Error.module.scss';
import ErrorEmoji from '/public/image/takgu/error_face.svg';

export default function ErrorPage() {
  const { goHome } = useErrorPage();
  const [error, setError] = useRecoilState(agendaErrorState);
  const { msg, status } = error;
  const setLoggedIn = useSetRecoilState<boolean>(loginState);
  const resetModal = useResetRecoilState(modalState);
  const router = useRouter();

  if (status === 401) {
    localStorage.removeItem('42gg-token');
    setLoggedIn(false);
  }

  const resetHandler = () => {
    if (status === 401) {
      localStorage.removeItem('42gg-token');
      setLoggedIn(false);
    }
    setError({ msg: '', status: 0 });
    goHome();
  };

  useEffect(() => {
    resetModal();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <div className={styles.title}>42GG</div>
        <div className={styles.error}>
          {msg}
          <div className={styles.errorCode}>({status})</div>
          <div className={styles.emojiWrapper}>
            <div className={styles.threeDotImage}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ErrorEmoji />
          </div>
        </div>
        <div className={styles.home} onClick={resetHandler}>
          <div className={styles.positive}>
            <input type='button' value='🏠 홈으로 🏠' />
          </div>
        </div>
        {/* 개발용 토큰 넣기 버튼 */}
        {process.env.NODE_ENV === 'development' && status === 401 ? (
          <>
            <input
              placeholder='insert token'
              type='text'
              name='tokenInput'
            ></input>
            <button
              onClick={(e: React.MouseEvent) => {
                const target = document.querySelector(
                  'input[name=tokenInput]'
                ) as HTMLInputElement;
                if (!target) return;

                console.log(target.value);
                localStorage.setItem('42gg-token', target.value);
                router.reload();
              }}
            >
              토큰 넣기
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
