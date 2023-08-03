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

export interface ImegaphoneId {
  megaphoneId: number;
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
