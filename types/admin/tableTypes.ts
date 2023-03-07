export type TableName =
  | 'notification'
  | 'userInfo'
  | 'feedback'
  | 'announcement';
export type EtcType = 'button' | 'toggle';

export type TableFormat = {
  [key in TableName]: {
    name: string;
    columns: string[];
    etc?: {
      type: EtcType;
      value: string[];
    };
  };
};

export interface IUser {
  id: number;
  intraId: string;
  statusMessage: string;
  roleType: string; // TODO : type으로 변경
}

export interface IUserTable {
  userSearchAdminDtos: IUser[];
  totalPage: number;
  currentPage: number;
}

export interface IFeedback {
  id: number;
  intraId: string;
  category: number; // 1: bug, 2: suggestion, 3: question
  content: string;
  createdTime: Date;
  isSolved: boolean;
}

export interface IFeedbackTable {
  feedbackList: IFeedback[];
  totalPage: number;
  currentPage: number;
}
