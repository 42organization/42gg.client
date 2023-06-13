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
  return (
    <div>
      {path && (
        <QueryClientProvider client={queryClient}>
          <GameResultList path={path} radioMode={mode} />
        </QueryClientProvider>
      )}
    </div>
  );
}
