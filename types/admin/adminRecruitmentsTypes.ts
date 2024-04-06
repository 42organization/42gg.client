import { Dispatch, SetStateAction } from 'react';

export interface Irecruit {
  id?: number;
  startDate: Date;
  endDate: Date;
  title: string;
  contents?: string;
  status?: '모집전' | '모집중' | '완료';
  generation: string;
  form?: Array<Iquestion>;
}

// 지원서 질문 interface (응답 전)
export interface Iquestion {
  questionId?: number | null;
  question: string;
  inputType: 'TEXT' | 'SINGLE_CHECK' | 'MULTI_CHECK';
  answer?: string;
  checkList?: Array<IcheckItem>;
}

export interface IcheckItem {
  checkId?: number;
  sortNum?: number;
  content: string;
}

export interface Inotication {
  applicationId: number;
  intraId: string;
  status: '합격' | '불합격' | '심사중';
}

export interface IrecruitTable {
  recruitmentDtoList: Array<Irecruit>;
  totalPage: number;
  currentPage: number;
}
export interface InoticationTable {
  noticationList: Array<Inotication>;
  totalPage: number;
  currentPage: number;
}

// 유저 응답 데이터 interface
// TODO : 버그 해결용 임시 처리이기 때문에 추후 수정 필요
export interface IuserFormResponse {
  questionId?: number | null;
  question: string;
  inputType: 'TEXT' | 'SINGLE_CHECK' | 'MULTI_CHECK';
  answer?: string;
  checkedList?: Array<IcheckItem>;
}

export interface IrecruitUserTable {
  applicationId: number;
  intraId: string;
  status?: '합격' | '불합격' | '심사중';
  form: IuserFormResponse[];
}

export interface IrecruitArrayTable {
  applicationResults: IrecruitUserTable[];
  totalPage: number;
  currentPage: number;
}

export interface RecruitmentsPages {
  pageType: 'MAIN' | 'EDIT' | 'DETAIL';
  props:
    | RecruitmentsMainProps
    | RecruitmentEditProps
    | RecruitmentDetailProps
    | null;
}

export interface RecruitmentsMainProps {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
}

export interface RecruitmentEditProps {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
  recruitmentInfo?: Irecruit | null;
  mode: 'CREATE' | 'MODIFY';
}

export interface RecruitmentDetailProps {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
  recruit: Irecruit;
}
