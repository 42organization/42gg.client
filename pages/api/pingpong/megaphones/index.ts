import { NextApiRequest, NextApiResponse } from 'next';

interface IMegaphone {
  megaphoneId: number;
  content: string;
  intraId: string;
}

const test: Array<IMegaphone> = [
  {
    megaphoneId: 0,
    content: '안녕하세요 hyungjpa입니다.',
    intraId: 'hyungjpa',
  },
  {
    megaphoneId: 1,
    content: '안녕하세요 jeyoon입니다.',
    intraId: 'jeyoon',
  },
  {
    megaphoneId: 2,
    content: '안녕하세요 sangmipa입니다',
    intraId: 'sangmipa',
  },
  {
    megaphoneId: 3,
    content: '안녕하세요 hyobicho입니다',
    intraId: 'hyobicho',
  },
  {
    megaphoneId: 4,
    content: '안녕하세요 hyungjpa2입니다.',
    intraId: 'hyungjpa2',
  },
  {
    megaphoneId: 5,
    content: '안녕하세요 jeyoon2입니다',
    intraId: 'jeyoon2',
  },
  {
    megaphoneId: 6,
    content: '안녕하세요 sangmipa2입니다',
    intraId: 'sangmipa2',
  },
  {
    megaphoneId: 7,
    content: '안녕하세요 hyobicho2입니다',
    intraId: 'hyobicho2',
  },
  {
    megaphoneId: 8,
    content: '안녕하세요 hyungjpa3입니다.',
    intraId: 'hyungjpa3',
  },
  {
    megaphoneId: 9,
    content: '안녕하세요 jeyoon3입니다',
    intraId: 'jeyoon3',
  },
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
