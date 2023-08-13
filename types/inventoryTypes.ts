export type InventoryItemStatus = 'BEFORE' | 'USING' | 'USED';

export type ItemType =
  | 'MEGAPHONE'
  | 'PROFILE_BACKGROUND'
  | 'PROFILE_BAND'
  | 'TEXT_COLOR'
  | 'PROFILE_IMAGE'; // REVIEW - 아이템 타입 추가 / 변경 가능성 있음.

export type InventoryItem = {
  receiptId: number; // 거래내역 아이디
  createdAt: string; // 구매날짜 // TODO : 표시할 수 있는 방법 생각해보기
  itemName: string; // 아이템 이름
  imageUri: string; // 아이템 이미지 uri
  itemPrice: number; // 아이템 가격 // REVIEW - 필요 여부 논의
  purchaserIntra: string; // 구매자 Intra Id
  ownerIntra: string; // 소유자 Intra Id // REVIEW - ownerIntra 필요 여부 논의
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

// NOTE : request body 미정
export type UseIdColorRequest = UseItemRequest & {
  color: string;
};
