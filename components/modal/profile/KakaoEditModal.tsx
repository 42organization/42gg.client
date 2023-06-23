
import styles from 'styles/modal/menu/KakaoEditModal.module.scss';
import { instance } from 'utils/axios';

export default function NormalGame() {
  const clickLinkHandler = async () => {
    try {
      const accessToken = localStorage.getItem('42gg-token'); //localStorage에 토큰 저장을 안할시 수정필요
      await instance.post(`/pingpong/users/oauth/kakao?${accessToken}`);
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
