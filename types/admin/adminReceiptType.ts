export interface Ireceipt {
  receiptId: number;
  createdAt: Date;
  itemName: string;
  itemPrice: number;
  purchaserIntraId: string;
  ownerIntraId: string;
  itemStatusType: string;
}

export interface IreceiptTable {
  receiptList: Array<Ireceipt>;
  totalPage: number;
  currentPage: number;
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
