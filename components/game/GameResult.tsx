import { QueryClient, QueryClientProvider } from 'react-query';
import { SeasonMode } from 'types/mainType';
import GameResultList from 'components/game/GameResultList';
import useGameResult from 'hooks/game/useGameResult';

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
