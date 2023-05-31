export interface NotiList {
  noti: Noti[];
}

export interface Noti {
  id: number;
  type: string;
  isChecked: boolean;
  message: string;
  createdAt: string;
}
