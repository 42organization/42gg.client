import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GameMode } from 'types/takgu/gameTypes';
import { AfterGame } from 'types/takgu/scoreTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/takgu/recoil/error';
import { liveState } from 'utils/takgu/recoil/layout';

const useCurrentGame = () => {
  const setError = useSetRecoilState(errorState);
  const { currentGameMode, gameId } = useRecoilValue(liveState);
  const [currentGame, setCurrentGame] = useState<AfterGame>({
    gameId: 0,
    mode: currentGameMode
      ? (currentGameMode.toUpperCase() as Uppercase<GameMode>)
      : null,
    startTime: '2022-07-13 11:50',
    isScoreExist: false,
    status: 'LIVE',
    matchTeamsInfo: {
      myTeam: { teamScore: 0, teamId: 0, players: [] },
      enemyTeam: { teamScore: 0, teamId: 0, players: [] },
    },
  });

  useEffect(() => {
    const getCurrentGameHandler = async () => {
      try {
        const res: AxiosResponse<AfterGame> = await instance.get(
          `/pingpong/games/${gameId}`
        );
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
