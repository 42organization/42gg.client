import { useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';

interface Enroll {
  slotId: number;
  type: string;
  mode?: 'normal' | 'rank';
}

const useMatchEnrollModal = ({ slotId, type, mode }: Enroll) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    SC001: '경기 등록에 실패하였습니다.',
    SC002: '이미 등록이 완료된 경기입니다.',
    SC003: '경기 취소 후 1분 동안 경기를 예약할 수 없습니다.',
    SC005: '패널티를 부여받은 유저는 경기에 등록할 수 없습니다.',
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
        setModal({ modalName: null });
        setError('JH05');
        return;
      }
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onEnroll, onCancel };
};

export default useMatchEnrollModal;
