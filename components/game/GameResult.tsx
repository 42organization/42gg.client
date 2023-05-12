import { SeasonMode } from 'types/mainType';
import useGameResult from 'hooks/game/useGameResult';
import GameResultList from 'components/game/GameResultList';
import { QueryClient, QueryClientProvider } from 'react-query';

interface GameResultProps {
  mode?: SeasonMode;
  season?: number;
}

export default function GameResult({ mode, season }: GameResultProps) {
  const queryClient = new QueryClient();
  const path = useGameResult({ mode: mode, season: season });

  /* const makeQuery = () => {
    if (asPath === '/' || asPath.includes('token')) {
      return { count: 3, status: 'live', gameId: '' };
    }
    const query: any = { gameId: '' };
    if (mode === 'rank') {
      query.season = season;
    }
    if (mode !== 'both') {
      query.mode = mode;
    }
    if (router.pathname === '/users/detail') {
      query.count = 5;
    }
    return query;
  }; */

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
