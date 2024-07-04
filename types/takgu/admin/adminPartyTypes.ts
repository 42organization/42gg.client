import { PartyCategory, PartyRoomStatus } from 'types/partyTypes';

export type PartyRoomColumn = {
  roomId: number;
  title: string;
  categoryName: PartyCategory['categoryName'];
  createDate: string;
  dueDate: string;
  creatorIntraId: string;
  roomStatus: PartyRoomStatus;
};

export type PartyPenaltyAdmin = {
  id: number;
  user: object;
  penaltyType: string;
  message: string;
  startTime: string;
  penaltyTime: number;
};
