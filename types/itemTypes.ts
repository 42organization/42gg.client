export interface Item {
  itemId: number;
  name: string;
  content: string;
  itemType: string;
  imageUri: string;
  originalPrice: number;
  discount: number;
  salePrice: number;
}

export interface ItemList {
  itemList: Item[];
}
