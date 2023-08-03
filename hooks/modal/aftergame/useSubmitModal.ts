import { useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { CoinResult } from 'types/coinTypes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { instance } from 'utils/axios';

type rankRequest = {
  gameId: number;
  myTeamId: number;
  myTeamScore: number | '';
  enemyTeamId: number;
  enemyTeamScore: number | '';
};

type normalRequest = {
  gameId: number;
};

type responseTypes = Record<'SUCCESS' | 'DUPLICATED', string>;

type errorResponse = {
  status: number;
  message: string;
  code: string;
};

const useSubmitModal = (currentGame: AfterGame) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const [normalcoin, setNormalCoin] = useState<CoinResult>({
    afterCoin: 8,
    beforeCoin: 6,
    coinIncrement: 2,
  });
  const [rankcoin, setRankCoin] = useState<CoinResult>({
    afterCoin: 10,
    beforeCoin: 5,
    coinIncrement: 5,
  });
  const { gameId, matchTeamsInfo, mode } = currentGame;
  const { myTeam, enemyTeam } = matchTeamsInfo;

  const rankResponse: responseTypes = {
    SUCCESS: '결과 입력이 완료되었습니다.',
    DUPLICATED: '상대가 이미 점수를 입력했습니다.',
  };

  const submitRankHandler = async (result: TeamScore) => {
    try {
      const requestBody: rankRequest = {
        gameId: gameId,
        myTeamId: myTeam.teamId,
        myTeamScore: result.myTeamScore,
        enemyTeamId: enemyTeam.teamId,
        enemyTeamScore: result.enemyTeamScore,
      };
      await instance.post(`/pingpong/games/rank`, requestBody);
      alert(rankResponse['SUCCESS']);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { code } = e.response.data as unknown as errorResponse;
        if (code == 'GM202' || code == 'GM204') {
          alert(rankResponse['DUPLICATED']);
          setReloadMatch(true); // 현재 유저 event 상태 재확인
        }
      } else {
        setError('JH04');
        return;
      }
    }
    openChangeModal();
  };

  async function openChangeModal() {
    openStatChangeModal();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
    openRankCoin();
  }

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
    openChangeModal();
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

  const openNormalCoin = () => {
    setModal({
      modalName: 'COIN-ANIMATION',
      CoinResult: {
        afterCoin: normalcoin?.afterCoin,
        beforeCoin: normalcoin?.beforeCoin,
        coinIncrement: normalcoin?.coinIncrement,
      },
    });
  };

  const openRankCoin = () => {
    setModal({
      modalName: 'COIN-ANIMATION',
      CoinResult: {
        afterCoin: rankcoin?.afterCoin,
        beforeCoin: rankcoin?.beforeCoin,
        coinIncrement: rankcoin?.coinIncrement,
      },
    });
  };

  return {
    submitRankHandler,
    submitNormalHandler,
    openStatChangeModal,
  };
};

export default useSubmitModal;
