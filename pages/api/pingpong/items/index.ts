import { InventoryData, InventoryItem } from 'types/inventoryTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

const item1: InventoryItem = {
  receiptId: 1,
  itemName: '확성기',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'USING',
  itemType: 'MEGAPHONE',
};

const item2: InventoryItem = {
  receiptId: 2,
  itemName: '확성기',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'BEFORE',
  itemType: 'MEGAPHONE',
};

const item3: InventoryItem = {
  receiptId: 3,
  itemName: '확성기',
  imageUri:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'jeyoon',
  itemStatus: 'USING',
  itemType: 'MEGAPHONE',
};

const item4: InventoryItem = {
  receiptId: 4,
  itemName: 'ID 색깔 변경권',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'USED',
  itemType: 'TEXT_COLOR',
};

const item5: InventoryItem = {
  receiptId: 5,
  itemName: 'Edge 뽑기',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'BEFORE',
  itemType: 'EDGE',
};

const item6: InventoryItem = {
  receiptId: 6,
  itemName: '배경 뽑기',
  imageUri:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'BEFORE',
  itemType: 'BACKGROUND',
};

const item7: InventoryItem = {
  receiptId: 7,
  itemName: '이미지 변경권',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'jeyoon',
  itemStatus: 'BEFORE',
  itemType: 'PROFILE_IMAGE',
};

const item8: InventoryItem = {
  receiptId: 8,
  itemName: '테스트8',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'USED',
  itemType: 'MEGAPHONE',
};

const item9: InventoryItem = {
  receiptId: 9,
  itemName: '테스트9',
  imageUri:
    'https://dodo.ac/np/images/thumb/1/17/NH_Balloon.jpg/600px-NH_Balloon.jpg',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'BEFORE',
  itemType: 'MEGAPHONE',
};

const item10: InventoryItem = {
  receiptId: 10,
  itemName: '테스트10',
  imageUri: 'https://cdn.nookazon.com/nookazon/icons/leaf.png',
  purchaserIntra: 'kim_takgu',
  itemStatus: 'BEFORE',
  itemType: 'MEGAPHONE',
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
    if (InventoryData.totalPage !== 0) {
      ret.storageItemList = storageItemList;
    }
  }

  res.status(200).json(ret);
}
