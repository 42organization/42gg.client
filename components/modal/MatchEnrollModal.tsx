import { enrollInfoState } from 'utils/recoil/match';
import { EnrollInfo } from 'types/matchTypes';
import instance from 'utils/axios';
import { useRecoilState } from 'recoil';
import { dateToString } from 'utils/handleTime';
import Modal from './Modal';
import styles from 'styles/modal/MatchEnroll.module.scss';

export default function MatchEnrollModal() {
  const [enrollInfo, setEnrollInfo] = useRecoilState<EnrollInfo | null>(
    enrollInfoState
  );

  if (!enrollInfo) return null;

  const { slotId, type, startTime, endTime } = enrollInfo;

  const onEnroll = async () => {
    const body = { slotId };
    const res = await instance.post(
      `/pingpong/match/tables/${1}/${type}`,
      body
    );
    alert(res?.data.message);
    setEnrollInfo(null);
  };

  const onCancel = () => setEnrollInfo(null);

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.phrase}>
          <div className={styles.emoji}>🏓</div>
          <div className={styles.time}>
            {dateToString(startTime)} - {dateToString(endTime)}
          </div>
          <div>경기에 참여하시겠습니까?</div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.negative} onClick={onCancel}>
            취소
          </button>
          <button className={styles.positive} onClick={onEnroll}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
