import type { NextApiRequest, NextApiResponse } from 'next';
import { Item, ItemList } from 'types/itemTypes';

const itemList: Item[] = [
  {
    itemId: 1,
    itemName: '프로필 사진 변경권',
    content: '42gg의 프로필 사진을 변경할 수 있는 아이템',
    itemType: 'PROF',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 100,
    discount: 10,
    salePrice: 90,
  },
  {
    itemId: 2,
    itemName: '확성기',
    content: '확성기 설명',
    itemType: 'MEGA',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 80,
    discount: 0,
    salePrice: 80,
  },
  {
    itemId: 3,
    itemName: '아이템3',
    content: '아이템3 설명',
    itemType: 'ITEM',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 300,
    discount: 20,
    salePrice: 240,
  },
];

const itemListData: ItemList = {
  itemList: itemList,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemList>
) {
  res.status(200).json(itemListData);
}
