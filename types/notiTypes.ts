export interface NotiList {
  noti: Noti[];
}

export interface Noti {
  id: number;
  type: string;
  message?: string;
  time?: string;
  isChecked: boolean;
  myTeam?: string[];
  enemyTeam?: string[];
  createdAt: string;
}
