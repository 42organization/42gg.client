import { NextApiRequest, NextApiResponse } from 'next';

const userApplyInfoOne = {
  applicationId: 1,
  endDate: '2024-03-15 00:12',
  title: '42GG',
  contents: '지원서',
  form: [
    {
      questionId: 1,
      inputType: 'SINGLE_CHECK',
      checkedList: [2],
    },
    {
      questionId: 2,
      inputType: 'TEXT',
      answer: '초록색',
    },
    {
      questionId: 3,
      inputType: 'MULTI_CHECK',
      checkedList: [1, 3, 5],
    },
  ],
};

const userApplyInfoTwo = {
  applicationId: 1,
  endDate: '2024-12-04 00:12',
  title: '42GG',
  contents: '지원서',
  form: [
    {
      questionId: 1,
      inputType: 'SINGLE_CHECK',
      checkedList: [3],
    },
    {
      questionId: 2,
      inputType: 'TEXT',
      answer: '안녕하세요 테스트입니다',
    },
    {
      questionId: 3,
      inputType: 'MULTI_CHECK',
      checkedList: [1, 3],
    },
    {
      questionId: 4,
      inputType: 'MULTI_CHECK',
      checkedList: [4],
    },
    {
      questionId: 5,
      inputType: 'TEXT',
      answer: '테스트 2',
    },
    {
      questionId: 6,
      inputType: 'TEXT',
      answer: '테스트 3',
    },
    {
      questionId: 7,
      inputType: 'TEXT',
      answer: '테스트 4',
    },
    {
      questionId: 8,
      inputType: 'SINGLE_CHECK',
      checkedList: [2],
    },
  ],
};

const userApplyInfos = [{}, userApplyInfoOne, userApplyInfoTwo];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recruitId } = req.query as {
    recruitId: string;
    applicationId: string;
  };

  res.status(200).json(userApplyInfos[Number(recruitId)]);
}
