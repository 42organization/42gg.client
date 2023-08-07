export type StoreMode = 'BUY' | 'INVENTORY';

export type InventoryItemStatus = 'BEFORE' | 'USING' | 'USED';

export type InventoryItem = {
  itemId: number;
  name: string;
  imageUrl: string;
  purchaserIntra: string;
  itemStatus: InventoryItemStatus;
};

export type InventoryData = {
  storageItemList: InventoryItem[];
  totalPage: number;
};
