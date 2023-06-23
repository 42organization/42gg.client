import styles from 'styles/modal/menu/KakaoEditModal.module.scss';
import { instance } from 'utils/axios';
import router from 'next/router';

export default function NormalGame() {
  const clickLinkHandler = async () => {
    try {
      router.push(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/kakao`
      );
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  const clickUnlinkHandler = async () => {
    try {
      await instance.delete('/pingpong/users/oauth/kakao');
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>카카오톡 연동</div>
      <div className={styles.buttons}>
        <button onClick={clickLinkHandler}>연동하기</button>
        <button onClick={clickUnlinkHandler}>연동 해제하기</button>
      </div>
    </div>
  );
}
