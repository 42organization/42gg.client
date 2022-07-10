import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GameResultList from 'components/game/GameResultList';

interface GameResult {
  intraId?: string;
}

export default function GameResult({ intraId }: GameResult) {
  const queryClient = new QueryClient();
  const [path, setPath] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === '/' || router.asPath.includes('token')) {
      setPath(`/pingpong/games?count=3&gameId=`);
    } else if (router.asPath === '/game') {
      setPath(`/pingpong/games?count=10&status=end&gameId=`);
    } else {
      setPath(`/pingpong/users/${intraId}/games?count=5&status=end&gameId=`);
    }
  }, [router.asPath]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {!path ? '로딩중' : <GameResultList path={path} />}
      </QueryClientProvider>
    </div>
  );
}
