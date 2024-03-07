import { PartyRoomStatus } from 'types/partyTypes';

export type PartyRoomColumn = {
  roomId: number;
  title: string;
  categoryName: string;
  createDate: string;
  dueDate: string;
  creatorIntraId: string;
  roomStatus: PartyRoomStatus;
};
