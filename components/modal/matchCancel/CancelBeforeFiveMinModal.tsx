import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/CancelModal.module.scss';

export default function CancelBeforeFiveMinModal() {
  const setModalInfo = useSetRecoilState(modalState);

  const onReturn = () => {
    setModalInfo({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😰</div>
        <div>
          경기를 취소할 수 없습니다!!
          <br />
        </div>
        <div className={styles.subContent}>
          경기시작 5분 전부터는
          <br />
          경기를 취소할 수 없습니다..
          <br />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value='확인' />
        </div>
      </div>
    </div>
  );
}
