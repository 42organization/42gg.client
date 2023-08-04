export interface Ireceipt {
  receiptId: number;
  createdAt: Date;
  itemName: string;
  itemPrice: number;
  purchaserIntra: string;
  ownerIntra: string;
  itemStatus: string;
}

export interface IreceiptTable {
  receiptList: Array<Ireceipt>;
  totalPage: number;
  currentPage: number;
}

export interface ImegaphoneInfo {
  megaphoneId: number;
  content: string;
  intraId: string;
}

export interface Imegaphone {
  megaphoneId: number;
  content: string;
  usedAt: Date;
  status: string;
  intraId: string;
}

export interface ImegaphoneTable {
  megaphoneList: Array<Imegaphone>;
  totalPage: number;
  currentPage: number;
}

export interface IprofileInfo {
  profileId: number;
  intraId: string;
  imageUrl: string;
}

export interface Iprofile {
  profileId: number;
  date: Date;
  intraId: string;
  imageUrl: string;
}

export interface IprofileTable {
  profileList: Array<Iprofile>;
  totalPage: number;
  currentPage: number;
}
