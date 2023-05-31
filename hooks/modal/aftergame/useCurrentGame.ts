import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosResponse } from 'axios';
import { AfterGame } from 'types/scoreTypes';
import { MatchMode } from 'types/mainType';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';

const useCurrentGame = () => {
  const setError = useSetRecoilState(errorState);
  const { currentMatchMode, gameId } = useRecoilValue(liveState);
  const [currentGame, setCurrentGame] = useState<AfterGame>({
    gameId: 0,
    mode: currentMatchMode
      ? (currentMatchMode.toUpperCase() as Uppercase<MatchMode>)
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
