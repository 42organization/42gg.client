export type PartyRoom = {
  roomId: number;
  title: string;
  categoryId: number;
  content: string;
  currentPeople: number;
  minPeople: number;
  maxPeople: number;
  dueDate: string;
  createDate: string;
  roomStatus: 'OPEN' | 'START' | 'FINISH' | 'HIDDEN';
  creator?: {
    userId: number;
    intraId: string;
  };
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
  reporterId: string;
  reporteeId: string;
  roomId: number;
  message: string;
  createdAt: Date;
};

export type PartyNoshowReport = {
  id: number;
  reporterId: string;
  reporteeId: string;
  roomId: number;
  message: string;
  createdAt: Date;
};

export type PartyCommentReport = {
  id: number;
  reporterId: string;
  commentsId: number;
  roomId: number;
  message: string;
  createdAt: Date;
};
