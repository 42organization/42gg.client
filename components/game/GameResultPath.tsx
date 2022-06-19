import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GameResultList from './GameResultList';

type gameResultTypes = {
  user?: string;
  isMain?: boolean;
};

export default function GameResultPath({
  user = '',
  isMain = false,
}: gameResultTypes) {
  const [path, setPath] = useState<string>();
  useEffect(() => {
    if (isMain) {
      setPath(`/pingpong/games?count=3&gameId=`);
    } else if (user !== '') {
      setPath(`/pingpong/users/${user}/games?count=4&status=end&gameId=`);
    } else {
      setPath(`/pingpong/games?count=4&gameId=`);
    }
  }, []);

  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {!path ? '로딩중' : <GameResultList path={path} isMain={isMain} />}
      </QueryClientProvider>
    </div>
  );
}
