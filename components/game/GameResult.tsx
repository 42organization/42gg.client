import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SeasonMode } from 'types/mainType';
import GameResultList from 'components/game/GameResultList';

interface GameResultProps {
  mode?: SeasonMode;
  season?: number;
}

export default function GameResult({ mode, season }: GameResultProps) {
  const [path, setPath] = useState('');
  const queryClient = new QueryClient();
  const router = useRouter();
  const asPath = router.asPath;
  const intraId = router.query.intraId;

  const makePath = () => {
    if (asPath === '/' || asPath.includes('token')) {
      setPath(`/pingpong/games?count=${3}&status=${'live'}&gameId=`);
      return;
    }
    const userQuery = intraId ? `/users/${intraId}` : '';
    const seasonQuery = mode === 'rank' && `season=${season}`;
    const modeQuery = mode !== 'both' && `mode=${mode}`;
    const countQuery = router.pathname === '/users/detail' && `count=${5}`;
    const query = [modeQuery, seasonQuery, countQuery, 'gameId=']
      .filter((item) => item)
      .join('&');
    setPath(`/pingpong/games${userQuery}?${query}`);
    return;
  };

  useEffect(() => {
    makePath();
  }, [asPath, intraId, mode, season]);

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
