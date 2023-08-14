import type { NextApiRequest, NextApiResponse } from 'next';
import { Item, ItemList } from 'types/itemTypes';

const itemList: Item[] = [
  {
    itemId: 1,
    itemName: '프로필 사진 변경권',
    content: '42gg의 프로필 사진을 변경할 수 있는 아이템',
    itemType: 'PROFILE_IMAGE',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 100,
    discount: 10,
    salePrice: 90,
  },
  {
    itemId: 2,
    itemName: '확성기',
    content: '확성기 설명',
    itemType: 'MEGAPHONE',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 20,
    discount: 0,
    salePrice: 20,
  },
  {
    itemId: 3,
    itemName: '프로필 배경색',
    content: '프로필 배경색 설명',
    itemType: 'PROFILE_BACKGROUND',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 300,
    discount: 30,
    salePrice: 210,
  },
  {
    itemId: 4,
    itemName: '프로필 이미지띠',
    content: '설명',
    itemType: 'PROFILE_BAND',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 50,
    discount: 10,
    salePrice: 45,
  },
  {
    itemId: 5,
    itemName: '이름 색 변경',
    content: '설명',
    itemType: 'TEXT_COLOR',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 200,
    discount: 0,
    salePrice: 200,
  },
];

const itemListData: ItemList = {
  itemList: itemList,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemList>
) {
  //   const itemList: Item[] = [
  //     {
  //       itemId: 1,
  //       name: '프로필 사진 변경권',
  //       content: '42gg의 프로필 사진을 변경할 수 있는 아이템',
  //       itemType: 'PROF',
  //       imageUri: '/image/fallBackSrc.jpeg',
  //       originalPrice: 1000,
  //       discount: 10,
  //       salePrice: 900,
  //     },
  //     {
  //       itemId: 2,
  //       name: '확성기',
  //       content: '확성기 설명',
  //       itemType: 'MEGA',
  //       imageUri: '/image/fallBackSrc.jpeg',
  //       originalPrice: 2000,
  //       discount: 0,
  //       salePrice: 2000,
  //     },
  //     {
  //       itemId: 3,
  //       name: '아이템3',
  //       content: '아이템3 설명',
  //       itemType: 'ITEM',
  //       imageUri: '/image/fallBackSrc.jpeg',
  //       originalPrice: 3000,
  //       discount: 30,
  //       salePrice: 2100,
  //     },
  //   ];

  //   const itemListData: ItemList = {
  //     itemList: itemList,
  //   };

  res.status(200).json(itemListData);
}
