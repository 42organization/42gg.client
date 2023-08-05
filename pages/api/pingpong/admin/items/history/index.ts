import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  itemHistoryList: [
    {
      itemId: 2,
      createdAt: '2023-08-05 20:10:10',
      intraId: 'hyungjpa',
      itemName: '확성기',
      content: '설명입니다',
      imageUrl: '/image/menu_manual.svg',
      price: 42,
      discount: 50,
      salePrice: 21,
    },
    {
      itemId: 1,
      createdAt: '2023-08-05 10:10:10',
      intraId: 'hyungjpa',
      itemName: '프로필 변경권',
      content: '설명입니다',
      imageUrl: 'no',
      price: 20,
      discount: 50,
      salePrice: 10,
    },
  ],
  totalPage: 2,
};

const testData2 = {
  itemHistoryList: [
    {
      itemId: 0,
      createdAt: '2023-08-05 20:10:10',
      intraId: 'hyungjpa',
      itemName: '확성기',
      content: '설명입니다',
      imageUrl: 'no',
      price: 42,
      discount: 50,
      salePrice: 21,
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
