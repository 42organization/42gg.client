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
  { id: 'USER', label: 'USER' },
  { id: 'GUEST', label: 'GUEST' },
  { id: 'ADMIN', label: 'ADMIN' },
];
