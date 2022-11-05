import { useSetRecoilState } from 'recoil';
import { Enroll } from 'types/modalTypes';
import { gameTimeToString } from 'utils/handleTime';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/MatchEnrollModal.module.scss';

export default function MatchEnrollModal({
  slotId,
  type,
  mode,
  startTime,
  endTime,
  reload,
}: Enroll) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);

  const onEnroll = async () => {
    try {
      const body = { slotId: slotId, mode: mode };
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
        setModal({ modalName: null });
        setError('JH05');
        return;
      }
    }
    setModal({ modalName: null });
    reload?.getMatchHandler();
    reload?.getLiveHandler();
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.time}>
          {gameTimeToString(startTime)} - {gameTimeToString(endTime)}
        </div>
        <div>
          {mode === 'rank' ? '(랭크전)' : '(일반전)'}
          <br />
          경기에 참여하시겠습니까?
        </div>
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
  );
}
