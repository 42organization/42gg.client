import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/MatchRejectModal.module.scss';

export default function MatchRejectModal() {
  const setModal = useSetRecoilState(modalState);
  const content = {
    main: '이미 예약된 경기가 있습니다.',
    sub: [
      '⚠︎ 해당 슬롯에 등록하고 싶다면',
      '예약되어 있는 경기를 취소해 주세요.',
    ],
  };

  const onReturn = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😤</div>
        <div>{content.main}</div>
        <div className={styles.subContent}>
          {content.sub.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value='확 인' />
        </div>
      </div>
    </div>
  );
}
