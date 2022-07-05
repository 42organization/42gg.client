import { useRecoilState, useSetRecoilState } from 'recoil';
import { enrollInfoState, matchModalState } from 'utils/recoil/match';
import { gameTimeToString } from 'utils/handleTime';
import { EnrollInfo } from 'types/matchTypes';
import { errorState } from 'utils/recoil/error';
import Modal from './Modal';
import instance from 'utils/axios';
import styles from 'styles/modal/MatchEnroll.module.scss';

export default function MatchEnrollModal() {
  const setErrorMessage = useSetRecoilState(errorState);
  const setMatchModal = useSetRecoilState(matchModalState);
  const [enrollInfo, setEnrollInfo] = useRecoilState<EnrollInfo | null>(
    enrollInfoState
  );

  if (!enrollInfo) return null;

  const { slotId, type, startTime, endTime } = enrollInfo;

  const onEnroll = async () => {
    try {
      const body = { slotId };
      await instance.post(`/pingpong/match/tables/${1}/${type}`, body);
      alert('경기가 성공적으로 등록되었습니다.');
    } catch (e: any) {
      if (e.response.data.code === 'SC001')
        alert('경기 등록에 실패하였습니다.');
      else if (e.response.data.code === 'SC002')
        alert('이미 등록이 완료된 경기입니다.');
      else if (e.response.data.code === 'SC003')
        alert('경기 취소 후 1분 동안 경기를 예약할 수 없습니다.');
      else {
        setMatchModal(null);
        setEnrollInfo(null);
        setErrorMessage('JH05');
        return;
      }
    }
    setMatchModal(null);
    setEnrollInfo(null);
    window.location.reload();
  };

  const onCancel = () => {
    setMatchModal(null);
    setEnrollInfo(null);
  };

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.phrase}>
          <div className={styles.emoji}>🏓</div>
          <div className={styles.time}>
            {gameTimeToString(startTime)} - {gameTimeToString(endTime)}
          </div>
          <div>경기에 참여하시겠습니까?</div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input onClick={onCancel} type='button' value='취소' />
          </div>
          <div className={styles.positive}>
            <input onClick={onEnroll} type='button' value='확인' />
          </div>
        </div>
      </div>
    </Modal>
  );
}
