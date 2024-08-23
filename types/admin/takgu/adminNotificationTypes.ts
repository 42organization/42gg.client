export interface INotification {
  id: number;
  intraId: string;
  message: string;
  type: string;
  createdAt: Date;
  isChecked: boolean;
}

export interface INotificaionTable {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}
