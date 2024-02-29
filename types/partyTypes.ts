export type PartyRoom = {
  roomId: number;
  title: string;
  categoryId: number;
  currentPeople: number;
  minPeople: number;
  maxPeople: number;
  isHidden: boolean;
  isOver: boolean;
  // Date는 react node에서 지원하지 않음. 따라서 string으로 변경해야함.
  dueDate: Date;
  createDate: Date;
};

export type PartyRoomDetail = PartyRoom & {
  myNickname: string | null;
  hostNickname: string;
  content: string;
  roomUsers: PartyRoomUser[];
  comments: PartyComment[];
};

export type PartyRoomUser = {
  roomUserId: number;
  nickname: string;
};

export type PartyComment = {
  commentId: number;
  nickname: string;
  content: string;
  isHidden: boolean;
  createDate: Date;
};

export type PartyCategory = {
  categoryId: number;
  categoryName: string;
};

export type PartyGameTemplete = {
  gameTemplateId: number;
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
  createdAt: Date;
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
  createdAt: Date;
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
  createdAt: Date;
};
