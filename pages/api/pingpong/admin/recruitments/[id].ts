import type { NextApiRequest, NextApiResponse } from 'next';

const fullRecruitData1 = {
  applications: [
    {
      applicationId: 1,
      intraId:
        'test1213412342134231412412423142142142134213423421341243123412341234124124124123',
      status: '합격',
      form: [
        {
          questionId: 1,
          question: '질문 1',
          inputType: 'TEXT',
          answer: '답변 1',
        },
        {
          questionId: 2,
          question: '질문 2',
          inputType: 'SINGLE_CHECK',
          checkedList: [{ checkId: 1, content: '선택지 1' }],
        },
        {
          questionId: 3,
          question: '질문 3',
          inputType: 'MULTI_CHECK',
          checkedList: [
            {
              checkId: 1,
              content: [
                { checkId: 1, content: '선택지 1' },
                { checkId: 2, content: '선택지 2' },
              ],
            },
          ],
        },
        {
          questionId: 4,
          question: '질문 4',
          inputType: 'MULTI_CHECK',
          checkedList: [
            {
              checkId: 1,
              content: [
                { checkId: 1, content: '선택지 1' },
                { checkId: 2, content: '123456789012345678901234567890' },
              ],
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
          inputType: 'SINGLE_CHECK',
          checkedList: [
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
          inputType: 'SINGLE_CHECK',
          checkedList: [
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
