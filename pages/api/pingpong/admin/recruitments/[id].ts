import type { NextApiRequest, NextApiResponse } from 'next';

const fullRecruitData1 = {
  applications: [
    {
      applicationId: 1,
      intraId: 'test1',
      status: '합격',
      form: [
        {
          questionId: 1,
          question: '이름',
          inputType: 'TEXT',
          answer: '홍길동',
        },
        {
          questionId: 2,
          question: '나이',
          inputType: 'SINGLE_CHECK',
          answer: '20',
        },
        {
          questionId: 3,
          question: '성별',
          inputType: 'MULTI_CHECK',
          checkList: [
            {
              checkId: 1,
              content: '남',
            },
          ],
        },
      ],
    },
    {
      applicationId: 2,
      intraId: 'test2',
      status: '불합격',
      form: [
        {
          questionId: 1,
          question: '이름',
          inputType: 'TEXT',
          answer: '김철수',
        },
        {
          questionId: 2,
          question: '나이',
          inputType: 'TEXT',
          answer: '25',
        },
        {
          questionId: 3,
          question: '성별',
          inputType: 'TEXT',
          checkList: [
            {
              checkId: 1,
              content: '여',
            },
          ],
        },
      ],
    },
    {
      applicationId: 3,
      intraId: 'test3',
      status: '심사중',
      form: [
        {
          questionId: 1,
          question: '이름',
          inputType: 'TEXT',
          answer: '박영희',
        },
        {
          questionId: 2,
          question: '나이',
          inputType: 'TEXT',
          answer: '30',
        },
        {
          questionId: 3,
          question: '성별',
          inputType: 'TEXT',
          checkList: [
            {
              checkId: 1,
              content: '여',
            },
          ],
        },
      ],
    },
  ],
  totalPage: 1,
  currentPage: 1,
};

const emptyRecruitData = {
  applications: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (id) {
    if (id) res.status(200).json(fullRecruitData1);
  } else {
    res.status(200).json(emptyRecruitData);
  }
}
