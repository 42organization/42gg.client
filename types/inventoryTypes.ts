// USED, DELETED 는 응답으로 오지 않음.
export type InventoryItemStatus = 'BEFORE' | 'WAITING' | 'USING';

export type ItemType =
  | 'MEGAPHONE'
  | 'BACKGROUND'
  | 'EDGE'
  | 'TEXT_COLOR'
  | 'PROFILE_IMAGE'; // REVIEW - 아이템 타입 추가 / 변경 가능성 있음.

export type RandomItem = 'EDGE' | 'BACKGROUND';

export type InventoryItem = {
  receiptId: number; // 거래내역 아이디
  itemName: string; // 아이템 이름
  imageUri: string; // 아이템 이미지 uri
  purchaserIntra: string; // 구매자 Intra Id
  itemType: ItemType; // 아이템 타입
  itemStatus: InventoryItemStatus;
};

export type InventoryData = {
  storageItemList: InventoryItem[];
  totalPage: number;
};

export type UseItemRequest = {
  receiptId: number;
};

export type UseMegaphoneRequest = UseItemRequest & {
  content: string;
};

export type UseIdColorRequest = UseItemRequest & {
  textColor: string;
};

export type UseItemData = UseItemRequest & {
  itemName?: string;
};
