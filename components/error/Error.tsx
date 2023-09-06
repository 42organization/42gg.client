import useErrorPage from 'hooks/error/useErrorPage';
import styles from 'styles/Error.module.scss';
import ErrorEmoji from '/public/image/error_face.svg';

export default function ErrorPage() {
  const { error, goHome } = useErrorPage();

  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <div className={styles.title}>42GG</div>
        <div className={styles.error}>
          {error === 'DK404'
            ? '잘못된 요청입니다!'
            : '데이터 요청에 실패하였습니다.'}
          <div className={styles.errorCode}>({error})</div>
          <div className={styles.emojiWrapper}>
            <div className={styles.threeDotImage}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ErrorEmoji />
          </div>
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
