import type { NextApiRequest, NextApiResponse } from 'next';
import { InventoryData, InventoryItem } from 'types/storeTypes';

const item1: InventoryItem = {
  itemId: 1,
  name: '테스트1',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'hyobicho',
  itemStatus: 'USING',
};

const item2: InventoryItem = {
  itemId: 2,
  name: '테스트2',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'hyungjpa',
  itemStatus: 'BEFORE',
};

const item3: InventoryItem = {
  itemId: 3,
  name: '테스트3',
  imageUrl:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'jeyoon',
  itemStatus: 'USING',
};

const item4: InventoryItem = {
  itemId: 4,
  name: '테스트4',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'sangmipa',
  itemStatus: 'USED',
};

const item5: InventoryItem = {
  itemId: 5,
  name: '테스트5',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'hyobicho',
  itemStatus: 'BEFORE',
};

const item6: InventoryItem = {
  itemId: 6,
  name: '테스트6',
  imageUrl:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'hyungjpa',
  itemStatus: 'BEFORE',
};

const item7: InventoryItem = {
  itemId: 7,
  name: '테스트7',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'jeyoon',
  itemStatus: 'USING',
};

const item8: InventoryItem = {
  itemId: 8,
  name: '테스트8',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'sangmipa',
  itemStatus: 'USED',
};

const item9: InventoryItem = {
  itemId: 9,
  name: '테스트9',
  imageUrl:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'hyobicho',
  itemStatus: 'BEFORE',
};

const item10: InventoryItem = {
  itemId: 10,
  name: '테스트10',
  imageUrl: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'hyungjpa',
  itemStatus: 'BEFORE',
};

const storageItemList: InventoryItem[] = [
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
];

// 빈 인벤토리
const InventoryDataEmpty: InventoryData = {
  storageItemList: [],
  totalPage: 0,
};

// 페이지 1개
const InventoryDataSingle: InventoryData = {
  storageItemList: storageItemList.slice(0, 4),
  totalPage: 1,
};

// 페이지 2개
const InventoryDataDouble: InventoryData = {
  storageItemList: storageItemList,
  totalPage: 2,
};

function pagination(
  page: number,
  size: number,
  storageItemList: InventoryItem[]
): InventoryItem[] {
  const ret = [];
  for (let index = 0; index < storageItemList.length; index += size) {
    ret.push(storageItemList.slice(index, index + size));
  }
  return ret[page - 1];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InventoryData>
) {
  // NOTE: 테스트 케이스에 맞춰서 다른 데이터를 보내주면 됩니다.
  // const InventoryData: InventoryData = InventoryDataEmpty;
  // const InventoryData: InventoryData = InventoryDataSingle;
  const InventoryData: InventoryData = InventoryDataDouble;

  const { page, size } = req.query;

  const ret: InventoryData = {
    storageItemList: [],
    totalPage: InventoryData.totalPage,
  };
  if (page && size) {
    const storageItemList = pagination(
      Number(page as string),
      Number(size as string),
      InventoryData.storageItemList
    );
    ret.storageItemList = storageItemList;
  }

  res.status(200).json(ret);
}
