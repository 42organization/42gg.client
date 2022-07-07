import { useSetRecoilState } from 'recoil';
import { newLoginState } from 'utils/recoil/layout';
import styles from 'styles/modal/WelcomeModal.module.scss';

export default function PageManualModal() {
  const setNewLogin = useSetRecoilState(newLoginState);

  const openPageManual = () => {
    window.open(
      'https://github.com/42organization/42arcade.gg.client#주요-기능-소개'
    );
  };

  const closeModalHandler = () => {
    setNewLogin(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}></div>
        <div className={styles.title}>Welcome</div>
        <div>
          42GG에 오신걸 환영합니다.
          <br />
          당신의 행복한 탁구 생활을
          <br />
          응원합니다! 총총총...
        </div>
        <div className={styles.rose}>
          <span>{`@`}</span>
          <span>{`)->->--`}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={openPageManual} type='button' value='페이지 소개' />
        </div>
        <div className={styles.positive}>
          <input onClick={closeModalHandler} type='button' value='홈으로' />
        </div>
      </div>
    </div>
  );
}
