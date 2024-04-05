export const roomStatusOpts = [
  'OPEN',
  'START',
  'FINISH',
  'HIDDEN',
  'FAIL',
] as const;

export type PartyRoomStatus = (typeof roomStatusOpts)[number];

export type PartyRoom = {
  roomId: number;
  title: string;
  categoryName: PartyCategory['categoryName'];
  currentPeople: number;
  minPeople: number;
  maxPeople: number;
  dueDate: string;
  createDate: string;
  status: PartyRoomStatus;
  creatorIntraId?: string;
};

export type PartyRoomDetail = PartyRoom & {
  myNickname: string | null;
  hostNickname: string;
  content: string;
  roomUsers: PartyRoomUser[];
  comments: PartyComment[];
};

export type PartyRoomUser = {
  userRoomId: number;
  nickname: string;
  userImage: string | null;
  roomUserId: number;
  intraId: string | null;
};

export type PartyComment = {
  commentId: number;
  nickname: string;
  intraId: string | null;
  isexist: boolean;
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
  categoryName: PartyCategory['categoryName'];
  gameName: string;
  maxGamePeople: number;
  minGamePeople: number;
  maxGameTime: number;
  minGameTime: number;
  genre: string;
  difficulty: string;
  summary: string;
};
export type PartyTemplateWithoutCategory = Omit<
  PartyGameTemplate,
  'categoryName'
>;

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

export type PartyCreateForm = {
  title: string;
  categoryName: PartyCategory['categoryName'];
  minPeople: number;
  maxPeople: number;
  content: string;
  openPeriod: number;
};

export type PartyTemplateForm = {
  gameTemplateId?: number;
  gameName: string;
  categoryName: PartyCategory['categoryName'];
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
  userIntraId?: string;
};

export type PartyPenaltyAdminSubmit = {
  penaltyType: string;
  message: string;
  penaltyTime: number;
  userIntraId: string;
};

export type PartyCommentReportTable = {
  commentReportList: PartyCommentReport[];
  totalPage: number;
  currentPage: number;
};

export type PartyPenaltyTable = {
  penaltyList: PartyPenaltyAdmin[];
  totalPage: number;
  currentPage: number;
};

export type PartyNoshowReportTable = {
  noShowReportList: PartyNoshowReport[];
  totalPages: number;
  currentPage: number;
};

export type PartyRoomReportTable = {
  roomReportList: PartyNoshowReport[];
  totalPages: number;
  currentPage: number;
};

export type PartyColors = 'PARTY-MAIN';
