import { useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';

type scoreRequest = {
  gameId: number;
  myTeamId: number;
  myTeamScore: number | '';
  enemyTeamId: number;
  enemyTeamScore: number | '';
};

type normalRequest = {
  gameId: number;
};

const scoreResponse: Record<'SUCCESS' | 'DUPLICATED', string> = {
  SUCCESS: '결과 입력이 완료되었습니다.',
  DUPLICATED: '이미 입력된 점수가 있습니다.',
};

const errorCode = ['GM202', 'GM204'] as const;

type errorCodeType = (typeof errorCode)[number];

type errorResponse = {
  status: number;
  message: string;
  code: errorCodeType;
};

const useSubmitModal = (currentGame: AfterGame) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const { gameId, matchTeamsInfo, mode } = currentGame;
  const { myTeam, enemyTeam } = matchTeamsInfo;

  const submitScoreHandler = async (result: TeamScore) => {
    try {
      const requestBody: scoreRequest = {
        gameId: gameId,
        myTeamId: myTeam.teamId,
        myTeamScore: result.myTeamScore,
        enemyTeamId: enemyTeam.teamId,
        enemyTeamScore: result.enemyTeamScore,
      };
      if (currentGame.mode === 'RANK')
        await instance.post(`/pingpong/games/rank`, requestBody);
      else if (currentGame.mode === 'TOURNAMENT')
        await instance.post(`/pingpong/games/tournament`, requestBody);
      alert(scoreResponse['SUCCESS']);
    } catch (e) {
      if (isAxiosError<errorResponse>(e) && e.response) {
        const { code } = e.response.data;
        if (code == 'GM202' || code == 'GM204') {
          alert(scoreResponse['DUPLICATED']);
          setReloadMatch(true); // 현재 유저 event 상태 재확인
        }
      } else {
        setError('JH04');
        return;
      }
    }
  };

  const submitNormalHandler = async () => {
    const requestBody: normalRequest = {
      gameId: gameId,
    };
    try {
      await instance.post(`/pingpong/games/normal`, requestBody);
    } catch (e) {
      setError('KP04');
      return;
    }
  };

  const openStatChangeModal = () => {
    setModal({
      modalName: 'FIXED-STAT',
      exp: {
        gameId: gameId,
        mode: mode,
      },
    });
  };

  return {
    submitScoreHandler,
    submitNormalHandler,
    openStatChangeModal,
  };
};

export default useSubmitModal;
