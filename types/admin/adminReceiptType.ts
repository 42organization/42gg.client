export interface Ireceipt {
  receiptId: number;
  createdAt: Date;
  itemName: string;
  itemPrice: number;
  purchaserIntraId: string;
  ownerIntraId: string;
  itemStatusType: 'BEFORE' | 'WAITING' | 'USING' | 'USED' | 'DELETED';
}

export type itemStatusType =
  | 'BEFORE'
  | 'WAITING'
  | 'USING'
  | 'USED'
  | 'DELETED';

export interface IreceiptTable {
  receiptList: Array<Ireceipt>;
  totalPage: number;
  currentPage: number;
}

export interface Imegaphone {
  megaphoneId: number;
  content: string;
  usedAt: Date;
  status: '사용 전' | '사용 대기' | '사용 중' | '사용 완료' | '삭제';
  intraId: string;
}

export interface ImegaphoneTable {
  megaphoneList: Array<Imegaphone>;
  totalPage: number;
  currentPage: number;
}

export interface Iprofile {
  profileId: number;
  date: Date;
  intraId: string;
  imageUri: string;
}

export interface IprofileTable {
  profileList: Array<Iprofile>;
  totalPage: number;
  currentPage: number;
}
