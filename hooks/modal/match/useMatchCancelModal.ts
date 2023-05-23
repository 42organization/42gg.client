import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Cancel } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import {
  currentMatchState,
  openCurrentMatchState,
  reloadMatchState,
} from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';

const useMatchCancelModal = ({ isMatched, slotId, time }: Cancel) => {
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [currentMatch, setCurrentMatch] = useRecoilState(currentMatchState);
  const cancelLimitTime = currentMatch.isImminent;
  const rejectCancel = cancelLimitTime && isMatched;
  const contentType: 'reject' | 'cancel' = rejectCancel ? 'reject' : 'cancel';
  const content = {
    cancel: {
      emoji: '🤔',
      main: '해당 경기를\n취소하시겠습니까?',
      sub: '⚠︎ 매칭이 완료된 경기를 취소하면\n1분 간 새로운 예약이 불가합니다!',
    },
    reject: {
      emoji: '😰',
      main: '매칭이 완료되어\n경기를 취소할 수 없습니다!!',
      sub: `상대방이 공개된 이후부터는\n경기를 취소할 수 없습니다..`,
    },
  };
  const cancelResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 취소되었습니다.',
    SD001: '이미 지난 경기입니다.',
    SD002: '이미 매칭이 완료된 경기입니다.',
  };

  useEffect(() => {
    getCurrentMatchHandler();
  }, []);

  const onCancel = async () => {
    try {
      await instance.delete(`/pingpong/match/slots/${slotId}`);
      alert(cancelResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in cancelResponse)
        alert(cancelResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        setOpenCurrentMatch(false);
        setError('JH01');
        return;
      }
    }
    setModal({ modalName: null });
    setOpenCurrentMatch(false);
    setReloadMatch(true);
  };

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get('/pingpong/match/current');
      setCurrentMatch(res.data);
    } catch (e) {
      setError('JH08');
    }
  };

  const onReturn = () => {
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  return {
    content,
    contentType,
    rejectCancel,
    onCancel,
    currentMatch,
    onReturn,
  };
};

export default useMatchCancelModal;
