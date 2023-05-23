import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { instance } from 'utils/axios';

type rankRequest = {
  gameId: number;
  myTeamId: number;
  myTeamScore: number | '';
  enemyTeamId: number;
  enemyTeamScore: number | '';
};

const useSubmitModal = (currentGame: AfterGame) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);

  const rankResponse: { [key: string]: string } = {
    '201': '결과 입력이 완료되었습니다.',
    '202': '상대가 이미 점수를 입력했습니다.',
  };

  const submitRankHandler = async (result: TeamScore) => {
    try {
      const requestBody: rankRequest = {
        gameId: currentGame.gameId,
        myTeamId: currentGame.matchTeamsInfo.myTeam.teamId,
        myTeamScore: result.myTeamScore,
        enemyTeamId: currentGame.matchTeamsInfo.enemyTeam.teamId,
        enemyTeamScore: result.enemyTeamScore,
      };
      const res = await instance.post(`/pingpong/games/rank`, requestBody);
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

  const openStatChangeModal = () => {
    setModal({
      modalName: 'FIXED-STAT',
      exp: {
        gameId: currentGame.gameId,
        mode: currentGame.mode,
      },
    });
  };

  return {
    submitRankHandler,
    submitNormalHandler,
    confirmRankHandler,
  };
};

export default useSubmitModal;
