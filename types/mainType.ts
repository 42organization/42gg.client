export type Mode = 'normal' | 'rank' | 'both';

export interface UserData {
  intraId: string;
  isAdmin: boolean;
  userImageUri: string;
  mode: Mode;
}

export interface LiveData {
  notiCount: number;
  event: 'match' | 'game' | null;
  mode: Mode | null; // TODO LiveData 에 CurrentMatch 를 포함시키는게 어떨까..? 시간정보 겹치고 API 호출 두번 해야되니까
}

export interface SearchData {
  users: string[];
}
