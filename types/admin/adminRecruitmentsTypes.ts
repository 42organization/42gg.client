export interface Irecruit {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
  status: '모집전' | '모집중' | '완료';
  generation: string;
}

export interface IrecruitEditInfo {
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  generation: string;
  form: Array<Iquestion>;
}

export interface Iquestion {
  questionId?: number | null;
  question: string;
  inputType: 'TEXT' | 'SINGLE_CHECK' | 'MULTI_CHECK';
  answer?: string;
  checkList?: Array<IcheckItem>;
}

export interface IcheckItem {
  checkId?: number;
  content: string;
}

export interface Inotication {
  applicationId: number;
  intraId: string;
  status: '합격' | '불합격' | '심사중';
}

export interface IrecruitTable {
  recruitment: Array<Irecruit>;
  totalPage: number;
  currentPage: number;
}
export interface InoticationTable {
  noticationList: Array<Inotication>;
  totalPage: number;
  currentPage: number;
}

export interface IrecruitUserTable {
  applications: {
    applicationId: number;
    intraId: string;
    status?: '합격' | '불합격' | '심사중';
    form: Array<Iquestion>;
  }[];
}
