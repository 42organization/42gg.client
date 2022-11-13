import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import NormalGame from './NormalGame';
import RankGame from './RankGame';

export default function AfterGameModal() {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const { currentMatchMode } = useRecoilValue(liveState);
  const [currentGame, setCurrentGame] = useState<AfterGame>({
    gameId: 0,
    mode: currentMatchMode,
    startTime: '2022-07-13 11:50',
    isScoreExist: false,
    matchTeamsInfo: {
      myTeam: { teamScore: 0, teams: [] },
      enemyTeam: { teamScore: 0, teams: [] },
    },
  });

  const rankResponse: { [key: string]: string } = {
    '201': '결과 입력이 완료되었습니다.',
    '202': '상대가 이미 점수를 입력했습니다.',
  };

  useEffect(() => {
    getCurrentGameHandler();
  }, []);

  const getCurrentGameHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/players`);
      setCurrentGame(res.data);
    } catch (e) {
      setError('JH03');
    }
  };

  const openStatChangeModal = () => {
    setModal({
      modalName: 'FIXED-STAT',
      exp: {
        gameId: currentGame.gameId,
        mode: currentGame.mode,
      },
    });
  };

  const submitRankHandler = async (result: TeamScore) => {
    try {
      const res = await instance.post(`/pingpong/games/result/rank`, result);
      alert(rankResponse[`${res?.status}`]);
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('JH04');
      return;
    }
    openStatChangeModal();
  };

  const submitNormalHandler = async () => {
    try {
      await instance.post(`/pingpong/games/result/normal`);
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('KP04');
      return;
    }
    openStatChangeModal();
  };

  const confirmRankHandler = async () => {
    try {
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('KP05');
      return;
    }
    openStatChangeModal();
  };

  if (currentGame.startTime === '2022-07-13 11:50') return null;

  return currentGame.mode === 'normal' ? (
    <NormalGame currentGame={currentGame} onSubmit={submitNormalHandler} />
  ) : (
    <RankGame
      currentGame={currentGame}
      onSubmit={
        currentGame.isScoreExist ? confirmRankHandler : submitRankHandler
      }
    />
  );
}
