import { useSetRecoilState } from 'recoil';
import styles from 'styles/modal/CancelModal.module.scss';
import { cancelModalState } from 'utils/recoil/match';

export default function CancelBeforeFiveMinModal() {
  const setOpenModal = useSetRecoilState(cancelModalState);

  const onReturn = () => {
    setOpenModal(false);
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
          경기시작 5분 전부터는 경기를 취소할 수 없습니다..
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
