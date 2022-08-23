import { useEffect, useState } from 'react';
import instance from 'utils/axios';
import { PlayerInfo, CurrentGameInfo } from 'types/scoreTypes';
import { useSetRecoilState } from 'recoil';
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
  const [currentGameInfo, setCurrentGameInfo] = useState<CurrentGameInfo>(
    defaultCurrentGameInfo
  );
  const normalGuide = {
    trueStr: '즐거운 경기 하셨나요?',
    falseStr: '경기 중',
  };
  const rankGuide = {
    trueStr: '경기 결과 확인',
    falseStr: '경기 후 점수를 입력해주세요',
  };

  useEffect(() => {
    getCurrentGameInfoHandler();
  }, []);

  const getCurrentGameInfoHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/result`);
      setCurrentGameInfo({
        mode: 'normal',
        startTime: minuitesAgo(10),
        matchTeamsInfo: { ...res?.data },
      }); // 임시
    } catch (e) {
      setErrorMessage('JH03');
    }
  };

  return currentGameInfo.mode === 'normal' ? (
    <NormalGameModal currentGameInfo={currentGameInfo} guide={normalGuide} />
  ) : (
    <RankGameModal currentGameInfo={currentGameInfo} guide={rankGuide} />
  );
}
