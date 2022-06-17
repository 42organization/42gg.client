import { QueryClient, QueryClientProvider } from 'react-query';
import GameResultList from '../components/game/GameResultList';

export default function Game() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GameResultList user='all' />
      </QueryClientProvider>
    </div>
  );
}
