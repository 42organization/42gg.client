import type { NextApiRequest, NextApiResponse } from 'next';

const formDataOne = [
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
];

const formDataTwo = [
  {
    questionId: 1,
    question:
      'alskdmflaksdmflkamsdlkfmalksdmflkamsdlk alksdmflkasdmlkfamlsdkmflaksmdklfamdslkfmasdmflamsdmf',
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
    question:
      '좋아하는 동물을 선택해주세요좋아하는 동물을 선택해주세요좋아하는 동물을 선택해주세요좋아하는 동물을 선택해주세요',
    inputType: 'MULTI_CHECK',
    checkList: [
      {
        id: 1,
        contents:
          '병아리병아리병아리병아리병아리병아리병아리 병아리병 아리병아리병아리병아 리 병 아리병 아리병아리병아리',
      },
      {
        id: 2,
        contents:
          'asdflkasjdflaksjdl;fkasdmflakskalskdfjalskdjflkasjdlkfajsldjkfkakjsdklfj',
      },
      { id: 3, contents: '판다' },
      { id: 4, contents: '기린' },
    ],
  },
];

const sampleContents =
  '<p class="ql-align-center"><br></p><p class="ql-align-center"><span class="ql-size-large">🎮</span><strong class="ql-size-large"> 42GG 신규 모집 </strong><span class="ql-size-large">🎮</span></p><p class="ql-align-center"><br></p><p class="ql-align-center">X월 XX일(수) XX:XX까지</p><p class="ql-align-center">면접 대상자 발표 : XX월 XX일</p><p class="ql-align-center">활동 일정 : X월 ~ X월</p><p class="ql-align-center">프론트, 백엔드 각 N명!</p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">👩🏻‍💻 나도 가능하다고? ☞ <a href="https://42gg.kr/" rel="noopener noreferrer" target="_blank">링크</a> 🔥</p>';

const recruitmentDetailOne = {
  applicationId: 1,
  startDate: '2024-03-04 12:12',
  endDate: '2024-03-04 14:12',
  title: '42GG 모집 1기',
  contents: sampleContents,
  generations: '1기',
  forms: formDataOne,
};

const recruitmentDetailTwo = {
  applicationId: 1,
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 모집 2기',
  contents: '지원서',
  generations: '2기',
  forms: formDataTwo,
};

const recruitmentDetailThree = {
  applicationId: 1,
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 모집 3기',
  contents: '지원서',
  generations: '3기',
  forms: formDataTwo,
};

const recruitmentDetailFour = {
  applicationId: 1,
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 모집 4기',
  contents: '지원서',
  generations: '4기',
  forms: formDataTwo,
};

const recruitmentDetailFive = {
  applicationId: 1,
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 모집 5기',
  contents: '지원서',
  generations: '5기',
  forms: formDataTwo,
};

const recruitmentDetailSix = {
  applicationId: 1,
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '긴 내용을 테스트!!!! 42GG 6기',
  contents: sampleContents.repeat(5),
  generations: '6기',
  forms: formDataTwo,
};

const recruitmentDetailSeven = {
  startDate: '2024-12-04 00:12',
  endDate: '2024-12-04 00:12',
  title: '42GG 7기',
  contents: sampleContents.repeat(5),
  generations: '7기',
  forms: formDataTwo,
};

const recruitments = [
  recruitmentDetailOne,
  recruitmentDetailTwo,
  recruitmentDetailThree,
  recruitmentDetailFour,
  recruitmentDetailFive,
  recruitmentDetailSix,
  recruitmentDetailSeven,
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  const numberId = parseInt(id);

  if (numberId > 0 && numberId <= recruitments.length) {
    res.status(200).json(recruitments[numberId - 1]);
  } else {
    res.status(200).json({});
  }
}
