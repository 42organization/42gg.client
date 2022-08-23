import { useEffect, useState } from 'react';
import instance from 'utils/axios';
import { PlayerInfo, CurrentGameInfo, GameResult } from 'types/scoreTypes';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { minuitesAgo } from 'utils/handleTime';
import NormalGameModal from './NormalGameModal';
import RankGameModal from './RankGameModal';

const defaultPlayersInfo: PlayerInfo[] = [{ intraId: '', userImageUri: '' }];
const defaultCurrentGameInfo: CurrentGameInfo = {
  mode: 'normal',
  startTime: '1970-01-01 00:00',
  matchTeamsInfo: {
    myTeam: defaultPlayersInfo,
    enemyTeam: defaultPlayersInfo,
  },
};

export default function AfterGameModal() {
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const [currentGameInfo, setCurrentGameInfo] = useState<CurrentGameInfo>(
    defaultCurrentGameInfo
  );
  const normalGuide = {
    before: '즐거운 경기 하셨나요?',
    after: '경기 중',
    explains: ['💡 경기시작 10분 후부터 ', '💡 경기를 완료할 수 있습니다'],
  };
  const rankGuide = {
    before: '경기 결과 확인',
    after: '경기 후 점수를 입력해주세요',
    explains: ['💡 3판 2선승제!', '💡 동점은 1점 내기로 승부를 결정!'],
  };

  useEffect(() => {
    getCurrentGameInfoHandler();
  }, []);

  const getCurrentGameInfoHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/result`);
      setCurrentGameInfo({
        mode: 'rank',
        startTime: minuitesAgo(10),
        matchTeamsInfo: { ...res?.data },
      }); // 임시
    } catch (e) {
      setErrorMessage('JH03');
    }
  };

  const submitRankResultHandler = async (result: GameResult) => {
    try {
      const res = await instance.post(`/pingpong/games/result`, result);
      if (res?.status === 201) {
        alert('결과 입력이 완료되었습니다.');
        setModalInfo({ modalName: null });
      } else if (res?.status === 202) {
        alert('상대가 이미 점수를 입력했습니다.');
        setModalInfo({ modalName: null });
      }
    } catch (e) {
      setErrorMessage('JH04');
      return;
    }
    window.location.href = '/';
  };

  const submitNormalResultHandler = async () => {
    try {
      await instance.post(`/pingpong/games/result/normal`);
      alert('게임이 종료되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e) {
      setErrorMessage('JH04');
      return;
    }
    window.location.href = '/';
  };

  return currentGameInfo.mode === 'normal' ? (
    <NormalGameModal
      currentGameInfo={currentGameInfo}
      guideLine={normalGuide}
      onSubmit={submitNormalResultHandler}
    />
  ) : (
    <RankGameModal
      currentGameInfo={currentGameInfo}
      guideLine={rankGuide}
      onSubmit={submitRankResultHandler}
    />
  );
}
