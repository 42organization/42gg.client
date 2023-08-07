// TODO: storeTypes에 합치기

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

export interface Gift {
  itemId: number;
  ownerId: string;
}

export interface Purchase {
  itemId: number;
}
