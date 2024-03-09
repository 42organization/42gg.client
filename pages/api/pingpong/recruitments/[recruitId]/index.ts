import type { NextApiRequest, NextApiResponse } from 'next';

const recruitmentDetail1 = {
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG',
  contents: '지원서',
  generations: '10기',
  form: [
    // {
    //   questionId: 1,
    //   question: '본인의 기수를 선택해주세요',
    //   inputType: 'SINGLE_CHECK',
    //   checkList: [
    //     { id: 1, contents: '1' },
    //     { id: 2, contents: '2' },
    //     { id: 3, contents: '3' },
    //   ],
    // },
    // {
    //   questionId: 2,
    //   question: '자기소개',
    //   inputType: 'TEXT',
    // },
    // {
    //   questionId: 3,
    //   question: '못 먹는 음식을 선택해주세요',
    //   inputType: 'MULTI_CHECK',
    //   checkList: [
    //     { id: 1, contents: '오이' },
    //     { id: 2, contents: '가지' },
    //     { id: 3, contents: '복숭아' },
    //   ],
    // },
  ],
};

const recruitmentDetail2 = {
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG',
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
        { id: 4, contents: '기린' },
      ],
    },
    {
      questionId: 5,
      question: '자기소개2',
      inputType: 'TEXT',
    },
    {
      questionId: 6,
      question: '자기소개3',
      inputType: 'TEXT',
    },
    {
      questionId: 7,
      question: '자기소개4',
      inputType: 'TEXT',
    },
    {
      questionId: 8,
      question: '42gg 들어와서 하고싶은 것을 골라주세요',
      inputType: 'SINGLE_CHECK',
      checkList: [
        { id: 1, contents: '숨쉬기' },
        { id: 2, contents: '누워있기' },
        { id: 3, contents: '아무것도 안하기' },
      ],
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recruitId } = req.query as { recruitId: string };

  if (recruitId === '0') {
    res.status(200).json({});
  } else {
    res.status(200).json(recruitmentDetail2);
  }
}
