import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecordMode } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import GameResultList from 'components/game/GameResultList';

interface GameResultProps {
  mode?: RecordMode;
  season?: string;
  isMine?: boolean;
}

export default function GameResult({ mode, season, isMine }: GameResultProps) {
  const queryClient = new QueryClient();
  const myIntraId = useRecoilValue(userState).intraId;
  const [path, setPath] = useState('');
  const router = useRouter();
  const asPath = router.asPath;
  const intraId = router.query.intraId;

  const makePath = () => {
    if (asPath === '/' || asPath.includes('token')) {
      setPath(`/pingpong/games?count=3&gameId=`);
      return;
    }
    const userOption = isMine
      ? `/users/${myIntraId}`
      : intraId
      ? `/users/${intraId}`
      : '';
    const seasonOption = mode === 'rank' && `season=${season}`;
    const modeOption = mode !== 'both' && `mode=${mode}`;
    const countOption = router.pathname === '/users/detail' && 'count=5';
    const query = [modeOption, seasonOption, countOption, 'gameId=']
      .filter((item) => item)
      .join('&');
    setPath(`/pingpong${userOption}/games?${query}`);
    return;
  };

  useEffect(() => {
    makePath();
  }, [asPath, mode, season, isMine]);

  return (
    <div>
      {path && (
        <QueryClientProvider client={queryClient}>
          <GameResultList path={path} />
        </QueryClientProvider>
      )}
    </div>
  );
}
