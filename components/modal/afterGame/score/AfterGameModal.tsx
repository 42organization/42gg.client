import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore, Team } from 'types/scoreTypes';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import NormalGame from './NormalGame';
import RankGame from './RankGame';
import { liveState } from 'utils/recoil/layout';

const defaultTeam = {
  teamScore: 0,
  teams: [
    {
      intraId: '',
      userImageUri: '',
    },
  ],
};
const defaultPlayers: Team = defaultTeam;

export default function AfterGameModal() {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const { currentMatchMode } = useRecoilValue(liveState);
  const defaultCurrentGame: AfterGame = {
    gameId: 0,
    mode: currentMatchMode,
    startTime: '1970-01-01 00:00',
    matchTeamsInfo: {
      myTeam: defaultPlayers,
      enemyTeam: defaultPlayers,
    },
  };
  const [currentGame, setCurrentGame] = useState<AfterGame>(defaultCurrentGame);

  const normalGuide = {
    before: '즐거운 경기 하셨나요?',
    after: '🔥 경기 중 🔥',
    explains: ['💡 경기시작 10분 후부터 ', '💡 경기를 완료할 수 있습니다'],
  };
  const rankGuide = {
    before: '경기 결과 확인',
    after: '경기 후 점수를 입력해주세요',
    explains: ['💡 3판 2선승제!', '💡 동점은 1점 내기로 승부를 결정!'],
  };

  const currentExp = {
    gameId: currentGame.gameId,
    mode: currentGame.mode,
  };

  useEffect(() => {
    getCurrentGameHandler();
  }, []);

  const getCurrentGameHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/players`);
      setCurrentGame({
        gameId: res?.data.gameId,
        mode: res?.data.mode,
        startTime: res?.data.startTime,
        matchTeamsInfo: { ...res?.data.matchTeamsInfo },
      });
    } catch (e) {
      setError('JH03');
    }
  };

  const submitRankResultHandler = async (result: TeamScore) => {
    try {
      const res = await instance.post(`/pingpong/games/result/rank`, result);
      await instance.put(`/pingpong/match/current`);
      if (res?.status === 201) {
        alert('결과 입력이 완료되었습니다.');
      } else if (res?.status === 202) {
        alert('상대가 이미 점수를 입력했습니다.');
      }
    } catch (e) {
      setError('JH04');
      return;
    }
    setModal({
      modalName: 'FIXED-EXP',
      exp: currentExp,
    });
  };

  const submitNormalResultHandler = async () => {
    try {
      await instance.post(`/pingpong/games/result/normal`);
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('DK03');
      return;
    }
    setModal({ modalName: 'FIXED-EXP', exp: currentExp });
  };

  return currentGame.mode === 'normal' ? (
    <NormalGame
      currentGame={currentGame}
      guideLine={normalGuide}
      onSubmit={submitNormalResultHandler}
    />
  ) : (
    <RankGame
      currentGame={currentGame}
      guideLine={rankGuide}
      onSubmit={submitRankResultHandler}
    />
  );
}
