export interface NotiData {
  id: number;
  type: string;
  message?: string;
  time?: string;
  isChecked: boolean;
  myTeam?: string[];
  enemyTeam?: string[];
  createdAt: string;
}
