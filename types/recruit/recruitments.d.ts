export type recruitmentStatus = 'BEFORE' | 'RECRUITING' | 'AFTER'; // TODO: 추후 명세서에 맞게 수정

export type recruitment = {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
  status: recruitmentStatus;
  generation: string;
};

export interface ICheck {
  id: number;
  contents: string;
}

export interface IQuestionForm {
  questionId: number;
  question: string;
  inputType: 'TEXT' | 'SINGLE_CHECK' | 'MULTI_CHECK';
  checkList?: ICheck[];
}

export interface IRecruitmentDetail {
  startDate: string;
  endDate: string;
  title: string;
  contents: string;
  generations: string;
  form: IQuestionForm[];
}