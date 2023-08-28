export interface IUser {
  id?: number;
  intraId: string;
  statusMessage: string;
  roleType: 'USER' | 'GUEST' | 'ADMIN';
}

export interface IUserTable {
  userInfoList: IUser[];
  totalPage: number;
  currentPage: number;
}

export interface IUserInfo extends IUser {
  userId: number;
  userImageUri: string | null;
  racketType: string;
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
