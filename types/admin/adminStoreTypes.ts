export interface Iitem {
  itemId: number;
  itemName: string;
  content: string;
  imageUrl: string;
  originalPrice: number;
  discount: number;
  salePrice: number;
}

export interface IitemList {
  itemList: Array<Iitem>;
}

export interface IitemHistory {
  itemId: number;
  createdAt: Date;
  intraId: string;
  itemName: string;
  content: string;
  imageUrl: string;
  price: number;
  discount: number;
  salePrice: number;
}

export interface IitemHistoryList {
  itemHistoryList: Array<IitemHistory>;
  totalPage: number;
  currentPage: number;
}
