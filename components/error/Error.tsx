import useErrorPage from 'hooks/error/useErrorPage';
import styles from 'styles/Error.module.scss';
import DizzyFace from '/public/image/dizzyface.svg';
import DizzyFaceNoMouth from '/public/image/dizzyface-no_mouth.svg';
import DizzyFaceLikeNoti from '/public/image/dizzyface-like_noti.svg';
import DizzyFaceLikeNoti2 from '/public/image/dizzyface-like_noti_2.svg';

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
            <DizzyFaceNoMouth />
            <DizzyFaceLikeNoti />
            <DizzyFaceLikeNoti2 />
            <DizzyFace />
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
