import type { NextApiRequest, NextApiResponse } from 'next';

const recruitmentDetailOne = {
  startDate: '2024-03-04 12:12',
  endDate: '2024-03-04 14:12',
  title: '42GG 모집',
  contents: '지원서',
  generations: '7기',
  form: [
    {
      questionId: 1,
      question: '지원동기를 적어주세요',
      inputType: 'TEXT',
    },
    {
      questionId: 2,
      question: '본인의 기수를 선택해주세요',
      inputType: 'SINGLE_CHECK',
      checkList: [
        { id: 1, contents: '1' },
        { id: 2, contents: '2' },
        { id: 3, contents: '3' },
      ],
    },
    {
      questionId: 3,
      question: '기술스택을 선택해주세요',
      inputType: 'MULTI_CHECK',
      checkList: [
        { id: 1, contents: 'C' },
        { id: 2, contents: 'C++' },
        { id: 3, contents: 'C#' },
      ],
    },
  ],
};

const recruitmentDetailTwo = {
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 모집',
  contents: '지원서',
  generations: '10기',
  form: [
    {
      questionId: 1,
      question: '본인의 기수를 선택해주세요',
      inputType: 'SINGLE_CHECK',
      checkList: [
        { id: 1, contents: '1' },
        { id: 2, contents: '2' },
        { id: 3, contents: '3' },
      ],
    },
    {
      questionId: 2,
      question: '자기소개',
      inputType: 'TEXT',
    },
    {
      questionId: 3,
      question: '못 먹는 음식을 선택해주세요',
      inputType: 'MULTI_CHECK',
      checkList: [
        { id: 1, contents: '오이' },
        { id: 2, contents: '가지' },
        { id: 3, contents: '복숭아' },
      ],
    },
    {
      questionId: 4,
      question: '좋아하는 동물을 선택해주세요',
      inputType: 'MULTI_CHECK',
      checkList: [
        { id: 1, contents: '병아리' },
        { id: 2, contents: '호랑이' },
        { id: 3, contents: '판다' },
        { id: 3, contents: '기린' },
      ],
    },
  ],
};

const recruitments = [recruitmentDetailOne, recruitmentDetailTwo];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (id === '1' || id === '2') {
    res.status(200).json(recruitments[parseInt(id) - 1]);
  } else {
    res.status(200).json({});
  }
}
