export interface AnnouncementProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  isSelected?: boolean;
  setSelected?: () => void;
}
