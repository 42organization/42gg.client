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

export type PartyGameTemplete = {
  gameTemplateId: number;
  gameName: string;
  categoryId: string;
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
  reportId: number;
  type: 'roomReport';
  reporter: {
    userId: number;
    userIntraId: number;
  };
  reportee: {
    userId: number;
    userIntraId: number;
  };
  room: PartyRoom;
  message: string;
  createdAt: string;
};

export type PartyNoshowReport = {
  reportId: number;
  type: 'noshowReport';
  reporter: {
    userId: number;
    userIntraId: number;
  };
  reportee: {
    userId: number;
    userIntraId: number;
  };
  room: PartyRoom;
  message: string;
  createdAt: string;
};

export type PartyCommentReport = {
  reportId: number;
  type: 'commentReport';
  reporter: {
    userId: number;
    userIntraId: number;
  };
  reportee: {
    userId: number;
    userIntraId: number;
  };
  room: PartyRoom;
  comment: PartyComment;
  message: string;
  createdAt: string;
};
