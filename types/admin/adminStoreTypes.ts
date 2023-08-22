export interface IitemHistory {
  itemId: number;
  createdAt: Date;
  itemName: string;
  content: string;
  imageUri: string;
  price: number;
  discount: number;
  creatorIntraId: string;
  deleterIntraId: string;
  visible: boolean;
}

export interface IitemHistoryList {
  itemHistoryList: Array<IitemHistory>;
  totalPage: number;
  currentPage: number;
}
