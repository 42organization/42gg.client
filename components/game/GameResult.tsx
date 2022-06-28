import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GameResultList from './GameResultList';

export default function GameResult() {
  const queryClient = new QueryClient();
  const [path, setPath] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === '/' || router.asPath.includes('token')) {
      setPath(`/pingpong/games?count=3&pageParam=`);
    } else if (router.asPath === '/game') {
      setPath(`/pingpong/games?count=10&pageParam=`);
    } else {
      setPath(`/pingpong${router.asPath}/games?count=4&status=end&pageParam=`);
    }
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {!path ? '로딩중' : <GameResultList path={path} />}
      </QueryClientProvider>
    </div>
  );
}
