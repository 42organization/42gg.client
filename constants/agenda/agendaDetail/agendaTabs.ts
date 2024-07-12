export const TABS = {
  DESCRIPTION: '대회설명',
  PARTICIPANTS: '참여자',
  ANNOUNCEMENTS: '공지',
  CONDITIONS: '조건',
} as const;

export type TabKeys = keyof typeof TABS;
export type TabValues = (typeof TABS)[TabKeys];
