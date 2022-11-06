import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore, Team } from 'types/scoreTypes';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import NormalGame from './NormalGame';
import RankGame from './RankGame';
import DefaultGame from './DefaultGame';

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
    startTime: '2022-07-13 11:50',
    isScoreExist: false,
    matchTeamsInfo: {
      myTeam: defaultPlayers,
      enemyTeam: defaultPlayers,
    },
  };

  const [currentGame, setCurrentGame] = useState<AfterGame>(defaultCurrentGame);

  const currentExp = {
    gameId: currentGame.gameId,
    mode: currentGame.mode,
  };

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
  const rankEndGuide = {
    before: '경기 결과!',
    after: '',
    explains: ['이미 입력된 경기 입니다 점수를 확인하세요!', ''],
  };
  const defaultGuide = {
    before: '',
    after: '',
    explains: ['', ''],
  };

  const getCurrentGameHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/players`);
      setCurrentGame({
        gameId: res?.data.gameId,
        mode: res?.data.mode,
        startTime: res?.data.startTime,
        isScoreExist: res?.data.isScoreExist,
        matchTeamsInfo: { ...res?.data.matchTeamsInfo },
      });
    } catch (e) {
      setError('KP05');
    }
  };

  const submitRankResultHandler = async (result: TeamScore) => {
    try {
      const res = await instance.post(`/pingpong/games/result/rank`, result);
      if (res?.status === 201) {
        alert('결과 입력이 완료되었습니다.');
      } else if (res?.status === 202) {
        alert('상대가 이미 점수를 입력했습니다.');
      }
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('KP05');
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
      setError('KP06');
      return;
    }
    setModal({ modalName: 'FIXED-EXP', exp: currentExp });
  };

  const submitRankExistResultHandler = async (result: TeamScore) => {
    try {
      await instance.put(`/pingpong/match/current`);
    } catch (e) {
      setError('KP07');
      return;
    }
    setModal({
      modalName: 'FIXED-EXP',
      exp: currentExp,
    });
  };

  function getRankOnSubMit(scoreExits: boolean) {
    if (scoreExits === true) {
      return submitRankExistResultHandler;
    } else {
      return submitRankResultHandler;
    }
  }

  function getRankGuidLine(scoreExits: boolean) {
    if (scoreExits === true) {
      return rankEndGuide;
    } else {
      return rankGuide;
    }
  }

  useEffect(() => {
    getCurrentGameHandler();
  }, []);

  return currentGame.startTime === '2022-07-13 11:50' ? (
    <DefaultGame guideLine={defaultGuide} />
  ) : currentGame.mode === 'normal' ? (
    <NormalGame
      currentGame={currentGame}
      guideLine={normalGuide}
      onSubmit={submitNormalResultHandler}
    />
  ) : (
    <RankGame
      currentGame={currentGame}
      guideLine={getRankGuidLine(currentGame.isScoreExist)}
      onSubmit={getRankOnSubMit(currentGame.isScoreExist)}
    />
  );
}
