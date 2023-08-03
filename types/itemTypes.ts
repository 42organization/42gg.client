export interface Item {
  itemId: number;
  itemName: string;
  content: string;
  imageUrl: string;
  price: number;
  discount: number;
  salePrice: number;
}

export interface ItemList {
  itemList: Item[];
}
