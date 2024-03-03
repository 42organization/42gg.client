export type PartyRoomTable = {
  roomId: number;
  title: string;
  categoryName: string;
  createDate: string;
  dueDate: string;
  creatorIntraId: string;
  roomStatus: 'open' | 'start' | 'finish' | 'hidden';
};
