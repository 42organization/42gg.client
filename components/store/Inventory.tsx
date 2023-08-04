import { QueryClientProvider, QueryClient } from 'react-query';
import { InventoryList } from './InventoryList';

export function Inventory() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InventoryList />{' '}
    </QueryClientProvider>
  );
}
