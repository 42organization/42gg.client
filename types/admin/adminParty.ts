export type PartyRoomTable = {
  roomId: number;
  title: string;
  category: string;
  createDate: string;
  dueDate: string;
  creatorIntraId: string;
  roomState: 'open' | 'start' | 'finish' | 'hidden';
};
