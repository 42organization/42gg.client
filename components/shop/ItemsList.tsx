import { useEffect, useState } from 'react';
import { ItemList } from 'types/itemTypes';
import ItemCard from 'components/shop/ItemCard';
import { useMockAxiosGet } from 'hooks/useAxiosGet';

export default function ItemsList({ coin }: { coin: number }) {
  const [itemList, setItemList] = useState<ItemList>({ itemList: [] });

  useEffect(() => {
    getItemList();
  }, []);

  const getItemList = useMockAxiosGet({
    url: '/items/store',
    setState: setItemList,
    err: 'HB01',
    type: 'setError',
  });

  return (
    <div>
      {itemList.itemList.map((item) => (
        <ItemCard key={item.itemId} item={item} coin={coin} />
      ))}
    </div>
  );
}
