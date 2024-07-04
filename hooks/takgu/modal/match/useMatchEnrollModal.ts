import { useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/takgu/mainType';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/takgu/match';
import { modalState } from 'utils/recoil/takgu/modal';

interface EnrollProps {
  startTime: string;
  mode: MatchMode | undefined;
}

const useMatchEnrollModal = ({ startTime, mode }: EnrollProps) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    MA100: '해당 슬롯을 불러올 수 없습니다.',
    MA300: '이미 등록이 완료된 경기입니다.',
    MA301: '슬롯은 한 번에 3개까지만 등록 가능합니다.',
    MA302: '패널티를 부여받은 유저는 경기에 등록할 수 없습니다.',
    MA303: '경기 등록에 실패하였습니다.',
  };
  const onEnroll = async () => {
    try {
      const body = { startTime: startTime, mode: mode };
      await instance.post(`/pingpong/match?type=${mode}`, body);
      alert(enrollResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in enrollResponse)
        alert(enrollResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        if (e.response.status === 403) {
          alert('카카오 유저는 경기에 등록할 수 없습니다.');
          return;
        }
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
