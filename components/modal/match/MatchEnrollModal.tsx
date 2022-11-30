import { useSetRecoilState } from 'recoil';
import { Enroll } from 'types/modalTypes';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/MatchEnrollModal.module.scss';

export default function MatchEnrollModal({ slotId, type, mode }: Enroll) {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    SC001: '경기 등록에 실패하였습니다.',
    SC002: '이미 등록이 완료된 경기입니다.',
    SC003: '경기 취소 후 1분 동안 경기를 예약할 수 없습니다.',
  };

  const onEnroll = async () => {
    try {
      const body = { slotId: slotId, mode: mode };
      await instance.post(`/pingpong/match/tables/${1}/${type}`, body);
      alert(enrollResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in enrollResponse)
        alert(enrollResponse[e.response.data.code]);
      else {
        alert('경기 등록에 실패하였습니다.');
      }
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.slotId}>
          {slotId}번 방
          <br />
          슬롯 예약을 확정하시겠습니까 ?
        </div>
        <div>예약 확정 후 상대를 확인해 주세요 !</div>
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
