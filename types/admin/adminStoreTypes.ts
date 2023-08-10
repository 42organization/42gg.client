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
