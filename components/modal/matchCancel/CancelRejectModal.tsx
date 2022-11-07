import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/CancelModal.module.scss';

interface CancelRejectModalProps {
  minute: number;
}

export default function CancelRejectModal({ minute }: CancelRejectModalProps) {
  const setModal = useSetRecoilState(modalState);
  const router = useRouter();
  const message = {
    main: ['매칭이 완료되어', <br />, '경기를 취소할 수 없습니다!!'],
    sub: [
      `경기시작 ${minute}분 전부터는`,
      <br />,
      '경기를 취소할 수 없습니다..',
    ],
  };

  const onReturn = () => {
    setModal({ modalName: null });
    router.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😰</div>
        <div>{message.main}</div>
        <div className={styles.subContent}>{message.sub}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value='확인' />
        </div>
      </div>
    </div>
  );
}
