export interface IUser {
  id: number;
  intraId: string;
  statusMessage: string;
  roleType: 'USER' | 'GUEST' | 'ADMIN';
}

export interface IUserTable {
  userInfoList: IUser[];
  totalPage: number;
  currentPage: number;
}

export interface IUserInfo {
  userId: number;
  intraId: string;
  userImageUri: string | null;
  statusMessage: string;
  racketType: string;
  roleType: 'USER' | 'GUEST' | 'ADMIN';
  wins: number | '';
  losses: number | '';
  ppp: number | '';
  email: string;
  coin: number;
}

export const roleTypes = [
  { id: 'ROLE_USER', label: 'USER' },
  { id: 'ROLE_GUEST', label: 'GUEST' },
  { id: 'ROLE_ADMIN', label: 'ADMIN' },
];
