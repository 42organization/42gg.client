import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { ItemList } from 'types/takgu/itemTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import ItemCard from 'components/takgu/store/purchase/ItemCard';
import StoreLoading from 'components/takgu/store/StoreLoading';

export default function ItemsList() {
  const setError = useSetRecoilState(errorState);
  const { data, isError, isLoading } = useQuery<ItemList>(
    'itemList',
    () => instance.get('/pingpong/items/store').then((res) => res.data),
    {
      retry: 1,
    }
  );

  if (isError) {
    setError('HB01');
  }
  if (isLoading) return <StoreLoading />;

  if (!data) return null;

  return (
    <div>
      {data.itemList.map((item) => (
        <ItemCard key={item.itemId} item={item} />
      ))}
    </div>
  );
}
