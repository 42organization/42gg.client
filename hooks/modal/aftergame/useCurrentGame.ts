import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AfterGame } from 'types/scoreTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';

const useCurrentGame = () => {
  const setError = useSetRecoilState(errorState);
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

  useEffect(() => {
    const getCurrentGameHandler = async () => {
      try {
        const res = await instance.get(`/pingpong/games/players`);
        setCurrentGame(res.data);
      } catch (e) {
        setError('JH03');
      }
    };

    getCurrentGameHandler();
  }, []);

  return { currentGame };
};

export default useCurrentGame;
