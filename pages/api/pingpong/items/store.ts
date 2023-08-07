import type { NextApiRequest, NextApiResponse } from 'next';
import { Item, ItemList } from 'types/itemTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemList>
) {
  const itemList: Item[] = [
    {
      itemId: 1,
      itemName: '프로필 사진 변경권',
      content: '42gg의 프로필 사진을 변경할 수 있는 아이템',
      imageUrl: '/image/fallBackSrc.jpeg',
      price: 100,
      discount: 10,
      salePrice: 90,
    },
    {
      itemId: 2,
      itemName: '확성기',
      content: '확성기 설명',
      imageUrl: '/image/fallBackSrc.jpeg',
      price: 200,
      discount: 0,
      salePrice: 200,
    },
    {
      itemId: 3,
      itemName: '아이템3',
      content: '아이템3 설명',
      imageUrl: '/image/fallBackSrc.jpeg',
      price: 300,
      discount: 30,
      salePrice: 210,
    },
  ];

  const itemListData: ItemList = {
    itemList: itemList,
  };

  res.status(200).json(itemListData);
}
