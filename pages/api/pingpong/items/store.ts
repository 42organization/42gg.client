import { Item, ItemList } from 'types/itemTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

const itemList: Item[] = [
  {
    itemId: 1,
    itemName: '이미지 변경권',
    mainContent: '프사 바꿔',
    subContent: '프로필 이미지를 원하는 이미지로 변경할 수 있는 아이템입니다.',
    itemType: 'PROFILE_IMAGE',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 100,
    discount: 10,
    salePrice: 90,
  },
  {
    itemId: 2,
    itemName: '확성기',
    mainContent: '오늘 42GG는 내가 접수한다📢😎',
    subContent:
      '24시간 동안 모든 페이지 상단에 메시지를 띄울 수 있는 아이템입니다. 사용 다음날 적용됩니다.',
    itemType: 'MEGAPHONE',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 20,
    discount: 0,
    salePrice: 20,
  },
  {
    itemId: 3,
    itemName: '배경 뽑기',
    mainContent: '난 “Background”부터가 달라',
    subContent:
      '랜덤으로 내 프로필 페이지의 배경을 변경할 수 있는 아이템입니다.',
    itemType: 'BACKGROUND',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 300,
    discount: 30,
    salePrice: 210,
  },
  {
    itemId: 4,
    itemName: 'Edge 뽑기',
    mainContent: '난 “Edge”로 말해..',
    subContent: '랜덤으로 프로필 테두리 색상을 변경할 수 있는 아이템입니다.',
    itemType: 'EDGE',
    imageUri: '/image/fallBackSrc.jpeg',
    originalPrice: 50,
    discount: 10,
    salePrice: 45,
  },
  {
    itemId: 5,
    itemName: 'ID 색깔 변경권',
    mainContent: '남들과는 다르게! ID 색깔을 바꿔보세요!',
    subContent:
      '색상코드를 직접 입력하여 랭킹 페이지의 ID 색상을 바꿀 수 있는 아이템입니다.',
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
  res.status(200).json(itemListData);
}
