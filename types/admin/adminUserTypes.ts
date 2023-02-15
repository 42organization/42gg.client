export type UserInfo = {
  userId: number;
  intraId: string;
  userImageUri: string | null;
  racketType: string;
  statusMessage: string | '';
  wins: number;
  losses: number;
  ppp: number;
  email: string | '';
  roleType: string;
};

export type AdminProfileProps = {
  value: string;
};

export const roleTypes = [
  { id: 'ROLE_USER', label: 'USER' },
  { id: 'ROLE_MANAGER', label: 'MANAGER' },
  { id: 'ROLE_ADMIN', label: 'ADMIN' },
];
