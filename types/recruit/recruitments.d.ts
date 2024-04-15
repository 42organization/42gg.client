export type recruitmentStatus = 'BEFORE' | 'RECRUITING' | 'AFTER'; // TODO: 추후 명세서에 맞게 수정

export type recruitment = {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
  status: recruitmentStatus;
  generation: string;
};

export type recruitmentQuestionTypes = 'TEXT' | 'SINGLE_CHECK' | 'MULTI_CHECK';

export type recruitmentListData = {
  recruitments: recruitment[];
  totalPage: number;
};

export type resultType =
  | null
  | 'PROGRESS_DOCS'
  | 'APPLICATION_FAIL'
  | 'INTERVIEW'
  | 'PASS'
  | 'INTERVIEW_FAIL';

export type recruitmentResult = {
  title: string;
  status: resultType;
  interviewDate: Date;
};

export interface ICheck {
  id: number;
  contents: string;
}

export interface IQuestionForm {
  questionId: number;
  question: string;
  inputType: recruitmentQuestionTypes;
  checkList?: ICheck[];
}

export interface IRecruitmentDetail {
  applicationId?: number; // 유저가 지원하지 않은 경우에는 applicationId가 없다.
  startDate: string;
  endDate: string;
  title: string;
  contents: string;
  generations: string;
  forms: IQuestionForm[];
}

export interface IApplicantAnswer {
  questionId: number;
  inputType: recruitmentQuestionTypes;
  checkedList: { checkListId: number; content: string }[];
  answer: string | null;
}

export type ApplicationFormType = 'APPLY' | 'VIEW' | 'EDIT';

export interface IUserApplicationInfo {
  applicationId: number;
  endTime: string;
  title: string;
  content: string;
}

export interface IapplicationAlertState {
  alertState: boolean;
  message: string;
  severity: AlertColor | undefined;
}

export interface IapplicationModal {
  state: boolean;
  content: 'APPLY' | 'CANCEL' | 'EDIT' | 'NONE';
  formData: IApplicantAnswer[];
}

export interface IRecruitmentDetailUser extends IUserApplicationInfo {
  forms: IApplicantAnswer[];
}

export type refMap = { [key: number]: HTMLDivElement };

export type RecruitmentMessageType = 'INTERVIEW' | 'PASS' | 'FAIL';

export interface IRecruitMessageTemplate {
  messageType: RecruitmentMessageType;
  content: string;
}
export interface IRecruitmentTemplate {
  messageId: number;
  messageType: RecruitmentMessageType;
  isUse: boolean;
  message: string;
}

export interface IRecruitmentTemplateList {
  messages: IRecruitmentTemplate[];
}
