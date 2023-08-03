import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  receiptList: [
    {
      receiptId: 13,
      createdAt: new Date(),
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 12,
      createdAt: new Date(),
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 11,
      createdAt: new Date(),
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 10,
      createdAt: new Date(),
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 9,
      createdAt: new Date(),
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 8,
      createdAt: new Date(),
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 7,
      createdAt: new Date(),
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 6,
      createdAt: new Date(),
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 5,
      createdAt: new Date(),
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
      createdAt: new Date(),
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 3,
      createdAt: new Date(),
      itemName: '프로필 사진 변경권',
      itemPrice: 21,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 2,
      createdAt: new Date(),
      itemName: '프로필 색상 변경권',
      itemPrice: 10,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 완료',
    },
    {
      receiptId: 1,
      createdAt: new Date(),
      itemName: '확성기',
      itemPrice: 42,
      purchaserIntra: 'admin',
      ownerIntra: 'hyungjpa',
      itemStatus: '사용 전',
    },
    {
      receiptId: 0,
      createdAt: new Date(),
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
