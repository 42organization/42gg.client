import { useSetRecoilState } from 'recoil';
import { matchModalState } from 'utils/recoil/match';
import styles from 'styles/modal/MatchRejectModal.module.scss';

export default function MatchRejectModal() {
  const setMatchModal = useSetRecoilState(matchModalState);

  const onReturn = () => {
    setMatchModal(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😤</div>
        <div>이미 예약된 경기가 있습니다.</div>
        <div className={styles.subContent}>
          &#9888; 해당 슬롯에 등록하고 싶다면
          <br />
          예약되어 있는 경기를 취소해 주세요.
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
