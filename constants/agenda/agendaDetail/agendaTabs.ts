export const TABS = {
  DESCRIPTION: '대회설명',
  PARTICIPANTS: '참여자',
  NOTIFICATIONS: '공지',
  POSTER: '포스터',
} as const;

export type TabKeys = keyof typeof TABS;
export type TabValues = (typeof TABS)[TabKeys];
