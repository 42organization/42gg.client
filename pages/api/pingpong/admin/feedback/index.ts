import { NextApiRequest, NextApiResponse } from 'next';

interface IFeedback {
  id: number;
  intraId: string;
  category: number; // 1: bug, 2: suggestion, 3: question
  content: string;
  createdTime: Date;
  isSolved: boolean;
}

interface IPagedFeedback {
  feedbackList: IFeedback[];
  totalPage: number;
  currentPage: number;
}

const PER_PAGE = 10;
const TOTAL_NOTI = 46;

export const makeFeedbacks = (
  page: string,
  intraId?: string
): IPagedFeedback => {
  let totalPage = (TOTAL_NOTI / PER_PAGE) as number;
  let filteredFeedbacks: IFeedback[] = [];
  const feedbacks: IFeedback[] = [];

  for (let i = 0; i < TOTAL_NOTI; i++) {
    feedbacks.push({
      id: i,
      intraId: `${
        Math.floor(Math.random() * 10) % 2 ? 'mosong' : `mosong${i}`
      }`,
      category: (Math.floor(Math.random() * 10) % 3) + 1,
      content: `Hello, World! ${Math.floor(Math.random() * 10)}`,
      createdTime: new Date(),
      isSolved: Math.floor(Math.random() * 10) % 3 ? true : false,
    });
  }

  if (intraId) {
    filteredFeedbacks = feedbacks.filter(
      (feedback) => feedback.intraId === intraId
    );
    totalPage = (filteredFeedbacks.length / PER_PAGE) as number;
  }

  return {
    feedbackList: intraId
      ? filteredFeedbacks.slice(
          (parseInt(page) - 1) * PER_PAGE,
          parseInt(page) * PER_PAGE
        )
      : feedbacks.slice(
          (parseInt(page) - 1) * PER_PAGE,
          parseInt(page) * PER_PAGE
        ),
    totalPage,
    currentPage: parseInt(page),
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };
  if (method === 'GET') {
    const feedbacks: IPagedFeedback = makeFeedbacks(page);
    console.log(feedbacks);
    return res.status(200).json(feedbacks);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
