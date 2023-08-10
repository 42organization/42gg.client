export interface IitemInfo {
  itemId: number;
  itemName: string;
  content: string;
  imageUri: string;
  originalPrice?: number;
  discount?: number;
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
