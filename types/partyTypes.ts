export type PartyRoomStatus = 'OPEN' | 'START' | 'FINISH' | 'HIDDEN' | 'FAIL';

/**
 * @typedef {Object} PartyRoom
 *  @property {string} [creatorIntraId] - adminAPI로 조회시 존재
 */
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

/**
 * @typedef {Object} PartyRoomDetail
 *  @property {string | null} [myNickname] - Room 참여시 존재
 */
export type PartyRoomDetail = PartyRoom & {
  myNickname: string | null;
  hostNickname: string;
  content: string;
  roomUsers: PartyRoomUser[];
  comments: PartyComment[];
};

/**
 * @typedef {Object} PartyRoomUser
 *  @property {string | null} [intraId] - Room 시작시 or Admin으로 조회시 존재
 */
export type PartyRoomUser = {
  userRoomId: number;
  nickname: string;
  userImage: string | null;
  roomUserId: number;

  intraId: string | null;
};

/**
 * @typedef {Object} PartyRoomDetail
 *  @property {string | null} [intraid] - Room 시작시 or Admin으로 조회시 존재
 */

export type PartyComment = {
  commentId: number;
  nickname: string;
  intraid: string | null;
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
  categoryId: number;
  minPeople: number;
  maxPeople: number;
  content: string;
  dueDate: string;
};

export type PartyTemplateForm = {
  gameTemplateId?: number;
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
