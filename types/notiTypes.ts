export interface NotiData {
  id: number;
  type: string;
  message: string | null;
  time: string;
  isChecked: boolean;
  myTeam?: string[];
  enemyTeam?: string[];
}
