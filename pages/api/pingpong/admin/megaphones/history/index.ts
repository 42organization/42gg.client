import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  megaphoneList: [
    {
      megaphoneId: 12,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 11,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 10,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 9,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 8,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 7,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 6,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 5,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 4,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 3,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
  ],
  totalPage: 2,
};

const testData2 = {
  megaphoneList: [
    {
      megaphoneId: 2,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 1,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 0,
      content: '확성기입니다',
      usedAt: new Date(),
      status: '사용 완료',
      intraId: 'hyungjpa',
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
