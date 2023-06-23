export type UserInfo = {
  userId: number;
  intraId: string;
  userImageUri: string | null;
  racketType: string;
  statusMessage: string;
  wins: number | '';
  losses: number | '';
  ppp: number | '';
  email: string;
  roleType: string;
};

export const roleTypes = [
  { id: 'ROLE_USER', label: 'USER' },
  { id: 'ROLE_GUEST', label: 'GUEST' },
  { id: 'ROLE_ADMIN', label: 'ADMIN' },
];
