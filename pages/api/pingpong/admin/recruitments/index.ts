import type { NextApiRequest, NextApiResponse } from 'next';

const fullRecruitData = {
  recruitment: [
    {
      id: 1,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      title: '테스트 모집',
      status: '모집전',
      generation: '1기',
    },
    {
      id: 2,
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      title: '테스트 모집qqqqqqasdfasdasdvasvsadvasdvsadvasdvsavasvas',
      status: '모집중',
      generation: '2기',
    },
    {
      id: 3,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      title: '테스트 모집',
      status: '완료',
      generation: '3기',
    },
  ],
  totalPage: 3,
  currentPage: 1,
};

const emptyRecruitData = {
  recruitList: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fullRecruitData);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).json({ message: 'post success', body: req.body });
}
