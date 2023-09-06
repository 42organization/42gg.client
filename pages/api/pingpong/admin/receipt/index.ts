import { NextApiRequest, NextApiResponse } from 'next';
import { Ireceipt } from 'types/admin/adminReceiptType';

interface IreceiptRes {
  receiptList: Array<Ireceipt>;
  totalPage: number;
}

const receipt1: Ireceipt = {
  receiptId: 1,
  createdAt: new Date('2023-08-05 20:10:10'),
  itemName: '확성기',
  itemPrice: 42,
  purchaserIntraId: 'hyungjpa',
  ownerIntraId: 'hyungjpa',
  itemStatusType: '사용 전',
};

const receipt2: Ireceipt = {
  receiptId: 2,
  createdAt: new Date('2023-08-05 19:20:10'),
  itemName: '프로필 사진 변경권',
  itemPrice: 21,
  purchaserIntraId: 'jeyoon',
  ownerIntraId: 'hyobicho',
  itemStatusType: '사용 완료',
};

const receipt3: Ireceipt = {
  receiptId: 3,
  createdAt: new Date('2023-08-04 10:10:10'),
  itemName: '프로필 색상 변경권',
  itemPrice: 10,
  purchaserIntraId: 'sangmipa',
  ownerIntraId: 'jeyoon',
  itemStatusType: '사용 완료',
};

const receipt4: Ireceipt = {
  receiptId: 4,
  createdAt: new Date('2023-08-04 05:30:10'),
  itemName: '확성기',
  itemPrice: 42,
  purchaserIntraId: 'hyobicho',
  ownerIntraId: 'sangmipa',
  itemStatusType: '사용 전',
};

const receipt5: Ireceipt = {
  receiptId: 5,
  createdAt: new Date('2023-08-01 21:29:10'),
  itemName: '프로필 사진 변경권',
  itemPrice: 21,
  purchaserIntraId: 'jeyoon',
  ownerIntraId: 'hyungjpa',
  itemStatusType: '사용 완료',
};

const receipt6: Ireceipt = {
  receiptId: 6,
  createdAt: new Date('2023-07-29 18:24:10'),
  itemName: '프로필 색상 변경권',
  itemPrice: 10,
  purchaserIntraId: 'hyungjpa',
  ownerIntraId: 'hyobicho',
  itemStatusType: '사용 완료',
};

const receipt7: Ireceipt = {
  receiptId: 7,
  createdAt: new Date('2023-07-28 10:10:10'),
  itemName: '확성기',
  itemPrice: 42,
  purchaserIntraId: 'hyobicho',
  ownerIntraId: 'jeyoon',
  itemStatusType: '사용 전',
};

const receipt8: Ireceipt = {
  receiptId: 8,
  createdAt: new Date('2023-06-30 21:10:10'),
  itemName: '프로필 사진 변경권',
  itemPrice: 21,
  purchaserIntraId: 'sangmipa',
  ownerIntraId: 'sangmipa',
  itemStatusType: '사용 완료',
};

const receipt9: Ireceipt = {
  receiptId: 9,
  createdAt: new Date('2023-06-21 20:13:10'),
  itemName: '프로필 색상 변경권',
  itemPrice: 10,
  purchaserIntraId: 'jeyoon',
  ownerIntraId: 'hyungjpa',
  itemStatusType: '사용 완료',
};

const receipt10: Ireceipt = {
  receiptId: 10,
  createdAt: new Date('2023-06-21 20:13:10'),
  itemName: '프로필 색상 변경권',
  itemPrice: 10,
  purchaserIntraId: 'sangmipa',
  ownerIntraId: 'hyungjpa',
  itemStatusType: '사용 완료',
};

const receiptList: Array<Ireceipt> = [
  receipt1,
  receipt2,
  receipt3,
  receipt4,
  receipt5,
  receipt6,
  receipt7,
  receipt8,
  receipt9,
  receipt10,
];

const resEmpty: IreceiptRes = {
  receiptList: [],
  totalPage: 0,
};

const resOne: IreceiptRes = {
  receiptList: receiptList.slice(0, 7),
  totalPage: 1,
};

const resTwo: IreceiptRes = {
  receiptList: receiptList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { intraId, page } = query as { intraId: string; page: string };

  // const temp: IreceiptRes = resEmpty;
  // const temp: IreceiptRes = resOne;
  const temp: IreceiptRes = resTwo;

  const resData: IreceiptRes = {
    receiptList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (intraId) {
      resData.receiptList = temp.receiptList.filter(
        (receipt: Ireceipt) =>
          receipt.ownerIntraId === intraId ||
          receipt.purchaserIntraId === intraId
      );
      resData.totalPage = 1;
    } else {
      if (page) {
        if (parseInt(page) === resData.totalPage) {
          resData.receiptList = temp.receiptList.slice(0, 4);
        } else {
          resData.receiptList = temp.receiptList;
        }
      }
    }

    res.status(200).json(resData);
  }
}
