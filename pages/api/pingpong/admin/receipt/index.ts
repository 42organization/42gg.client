import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  receiptList: [
    {
      receiptId: 13,
      createdAt: '2023-08-05 20:10:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 12,
      createdAt: '2023-08-05 19:20:10',
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 11,
      createdAt: '2023-08-04 10:10:10',
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 10,
      createdAt: '2023-08-04 05:30:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 9,
      createdAt: '2023-08-01 21:29:10',
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 8,
      createdAt: '2023-07-29 18:24:10',
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 7,
      createdAt: '2023-07-28 10:10:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 6,
      createdAt: '2023-06-30 21:10:10',
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 5,
      createdAt: '2023-06-21 20:13:10',
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
  ],
  totalPage: 2,
};

const testData2 = {
  receiptList: [
    {
      receiptId: 4,
      createdAt: '2023-04-05 10:10:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 3,
      createdAt: '2023-03-05 10:10:10',
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 2,
      createdAt: '2023-02-05 10:10:10',
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 1,
      createdAt: '2023-01-05 10:10:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 0,
      createdAt: '2023-01-03 10:10:10',
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
  ],
  totalPage: 2,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };

  if (method === 'GET') {
    if (page === '1') res.status(200).json(testData1);
    else res.status(200).json(testData2);
  }
}
