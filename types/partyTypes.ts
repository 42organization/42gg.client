export type PartyRoomStatus = 'OPEN' | 'START' | 'FINISH' | 'HIDDEN';

export type PartyRoom = {
  roomId: number;
  title: string;
  categoryId: number;
  currentPeople: number;
  minPeople: number;
  maxPeople: number;
  dueDate: string;
  createDate: string;
  roomStatus: PartyRoomStatus;
  creatorIntraId?: string;
};

export type PartyRoomDetail = PartyRoom & {
  myNickname: string | null; // 촉촉한 초코칩
  hostNickname: string; // 촉촉한 초코칩
  content: string;
  roomUsers: PartyRoomUser[];
  comments: PartyComment[];
};

export type PartyRoomUser = {
  roomUserId: number;
  nickname: string;
  intraId?: string;
};

// 닉네임과 아이디를 가지고 있는 api를 만들어줌. 추가 필요.

export type PartyComment = {
  commentId: number;
  nickname: string; // 촉촉한 초코칩
  content: string;
  isHidden: boolean;
  createDate: string;
};

export type PartyCategory = {
  categoryId: number;
  categoryName: string;
};

export type PartyGameTemplate = {
  gameTemplateId: number;
  categoryId: number;
  gameName: string;
  maxGamePeople: number;
  minGamePeople: number;
  maxGameTime: number;
  minGameTime: number;
  genre: string;
  difficulty: string;
  summary: string;
};

export type PartyReport =
  | PartyRoomReport
  | PartyNoshowReport
  | PartyCommentReport;

export type PartyRoomReport = {
  id: number;
  reporterIntraId: string;
  reporteeIntraId: string;
  roomId: number;
  message: string;
  createdAt: string;
};

export type PartyNoshowReport = {
  id: number;
  reporterIntraId: string;
  reporteeIntraId: string;
  roomId: number;
  message: string;
  createdAt: string;
};

export type PartyCommentReport = {
  id: number;
  reporterIntraId: string;
  commentsId: number;
  roomId: number;
  message: string;
  createdAt: string;
};

export type PartyForm = {
  title: string;
  categoryId: number;
  minPeople: number;
  maxPeople: number;
  content: string;
  dueDate: string;
};

export type PartyTemplateForm = {
  gameName: string;
  categoryId: number;
  maxGamePeople: number;
  minGamePeople: number;
  maxGameTime: number;
  minGameTime: number;
  genre: string;
  difficulty: string;
  summary: string;
};

export type PartyPenaltyAdmin = {
  id: number;
  user: object;
  penaltyType: string;
  message: string;
  startTime: string;
  penaltyTime: number;
};
