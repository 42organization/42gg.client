export interface Irecruit {
  id: number;
  startDate: string;
  endDate: string;
  usedAt: string;
  title: string;
  status: '모집전' | '모집중' | '완료';
  generation: string;
}
export interface Inotication {
  id: number;
  intraId: string;
  status: '합격' | '불합격' | '심사중';
}

export interface IrecruitTable {
  recruitList: Array<Irecruit>;
  totalPage: number;
  currentPage: number;
}
export interface InoticationTable {
  noticationList: Array<Inotication>;
  totalPage: number;
  currentPage: number;
}

export interface Ichecked {
  checkId: number;
  content: string;
}
export interface IrecruitUser {
  questionId: number;
  question?: string;
  inputType?: string;
  answer?: string;
  checkedList?: Array<Ichecked>;
}

export interface IrecruitUserTable {
  applications: {
    applicationId: number;
    intraId: string;
    status?: '합격' | '불합격' | '심사중';
    form: Array<IrecruitUser>;
  }[];
}
