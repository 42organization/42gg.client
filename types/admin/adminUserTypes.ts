export type UserInfo = {
  userId: number;
  intraId: string;
  userImageUri: string;
  racketType: string;
  statusMessage: string;
  wins: number;
  losses: number;
  ppp: number;
  eMail: string;
  roleType: string;
};

export type Props = {
  modalName: 'ADMIN-PROFILE';
  intraId: string;
};

export const roleTypes = [
  { id: 'ROLE_USER', label: 'USER' },
  { id: 'ROLE_MANAGER', label: 'MANAGER' },
  { id: 'ROLE_ADMIN', label: 'ADMIN' },
];
