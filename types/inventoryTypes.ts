export type StoreMode = 'BUY' | 'INVENTORY';

export type InventoryItemStatus = 'BEFORE' | 'USING' | 'USED';

export type ItemCodeType = 'MEGAPHONE';

export type InventoryItem = {
  receiptId: number; // 거래내역 아이디
  createdAt: string; // 구매날짜 // TODO : 표시할 수 있는 방법 생각해보기
  itemName: string; // 아이템 이름
  imageUri: string; // 아이템 이미지 uri
  itemPrice: number; // 아이템 가격 // REVIEW - 필요 여부 논의
  purchaserIntra: string; // 구매자 Intra Id
  ownerIntra: string; // 소유자 Intra Id // REVIEW - ownerIntra 필요 여부 논의
  itemCode: ItemCodeType; // 아이템 코드 // REVIEW - 속성 이름, 값 논의
  itemStatus: InventoryItemStatus;
};

export type InventoryData = {
  storageItemList: InventoryItem[];
  totalPage: number;
};

export type UseItemRequest = {
  receiptId: number;
};
