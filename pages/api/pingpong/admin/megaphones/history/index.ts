import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  megaphoneList: [
    {
      megaphoneId: 12,
      content: '확성기입니다',
      usedAt: '2023-08-05 10:10:10',
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 11,
      content: '확성기입니다',
      usedAt: '2023-07-05 10:10:10',
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 10,
      content: '확성기입니다',
      usedAt: '2023-07-05 06:10:10',
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 9,
      content: '확성기입니다',
      usedAt: '2023-07-03 10:10:10',
      status: '사용 중',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 8,
      content: '확성기입니다',
      usedAt: '2023-07-02 10:20:10',
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 7,
      content: '확성기입니다',
      usedAt: '2023-06-05 10:10:10',
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 6,
      content: '확성기입니다',
      usedAt: '2023-06-05 10:00:10',
      status: '사용 대기',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 5,
      content: '확성기입니다',
      usedAt: '2023-05-05 10:10:10',
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 4,
      content: '확성기입니다',
      usedAt: '2023-05-04 10:10:10',
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 3,
      content: '확성기입니다',
      usedAt: '2023-05-03 10:10:10',
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
      usedAt: '2023-05-02 10:10:10',
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 1,
      content: '확성기입니다',
      usedAt: '2023-05-01 10:10:10',
      status: '사용 완료',
      intraId: 'hyungjpa',
    },
    {
      megaphoneId: 0,
      content: '확성기입니다',
      usedAt: '2023-05-01 00:10:10',
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
