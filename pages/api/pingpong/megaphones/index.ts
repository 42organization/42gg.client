import { NextApiRequest, NextApiResponse } from 'next';

interface IMegaphone {
  megaphoneId: number;
  content: string;
  intraId: string;
}

const test: Array<IMegaphone> = [
  // {
  //     megaphoneId: 0,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 1,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 2,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 3,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 4,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 5,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 6,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 7,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 8,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
  // {
  //     megaphoneId: 9,
  //     content: 'test test',
  //     intraId: 'testUser',
  // },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json({ megaphoneList: test });
  }
  if (method === 'POST') {
    const { content, intraId } = req.body;
    const newMegaphone: IMegaphone = {
      megaphoneId: test.length,
      content,
      intraId,
    };
    test.push(newMegaphone);
    return res.status(200).json({ megaphoneList: test });
  }
}
