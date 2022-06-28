import instance from 'utils/axios';
import { useSetRecoilState } from 'recoil';
import { cancelModalState } from 'utils/recoil/match';
import styles from 'styles/modal/CancelModal.module.scss';

type SlotProps = {
  slotId: number;
};
export default function CancelModal({ slotId }: SlotProps) {
  const setOpenModal = useSetRecoilState<boolean>(cancelModalState);

  const onCancel = async () => {
    try {
      const res = await instance.delete(
        `/pingpong/match/tables/${1}/slots/${slotId}`
      );
      alert(res?.data.message);
    } catch (e) {
      console.log(e);
    }
    setOpenModal(false);
  };

  const onReturn = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🤔</div>
        <div>
          정말 경기를 <br /> 취소하시겠습니까?
        </div>
      </div>
      <div className={styles.buttons}>
        <input
          className={styles.negative}
          onClick={onReturn}
          type='button'
          value='아니오'
        />
        <input
          className={styles.positive}
          onClick={onCancel}
          type='button'
          value='예'
        />
      </div>
    </div>
  );
}
