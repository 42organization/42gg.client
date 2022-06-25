import { enrollInfoState } from '../../utils/recoil/match';
import { EnrollInfo } from '../../types/matchTypes';
import instance from '../../utils/axios';
import { useRecoilState } from 'recoil';
import { dateToString } from '../../utils/handleTime';
import Modal from '../Layout/Modal';
import styles from '../../styles/match/MatchEnroll.module.scss';

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
        <div>
          <div className={styles.icon}>🏓</div>
          <div className={styles.timeString}>
            {dateToString(startTime)} - {dateToString(endTime)}
          </div>
          <div className={styles.string}>경기에 참여하시겠습니까?</div>
        </div>
        <div>
          <button className={styles.submitButton} onClick={onEnroll}>
            확인
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
