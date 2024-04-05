import { NextApiRequest, NextApiResponse } from 'next';

const userAnswerOne = [
  {
    questionId: 1,
    inputType: 'TEXT',
    answer: '안녕하세요 테스트입니다.',
  },
  {
    questionId: 2,
    inputType: 'SINGLE_CHECK',
    checkedList: [3],
  },
  {
    questionId: 3,
    inputType: 'MULTI_CHECK',
    checkedList: [1, 3],
  },
];

const userAnswerTwo = [
  {
    questionId: 1,
    inputType: 'SINGLE_CHECK',
    checkedList: [2],
  },
  {
    questionId: 2,
    inputType: 'TEXT',
    answer: '안녕하세요 테스트입니다 222',
  },
  {
    questionId: 3,
    inputType: 'MULTI_CHECK',
    checkedList: [1, 3],
  },
  {
    questionId: 4,
    inputType: 'MULTI_CHECK',
    checkedList: [1, 2, 3],
  },
];

const sampleContents =
  '<p class="ql-align-center"><br></p><p class="ql-align-center"><span class="ql-size-large">🎮</span><strong class="ql-size-large"> 42GG 신규 모집 </strong><span class="ql-size-large">🎮</span></p><p class="ql-align-center"><br></p><p class="ql-align-center">X월 XX일(수) XX:XX까지</p><p class="ql-align-center">면접 대상자 발표 : XX월 XX일</p><p class="ql-align-center">활동 일정 : X월 ~ X월</p><p class="ql-align-center">프론트, 백엔드 각 N명!</p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">👩🏻‍💻 나도 가능하다고? ☞ <a href="https://42gg.kr/" rel="noopener noreferrer" target="_blank">링크</a> 🔥</p>';

const applicationInfoOne = {
  applicationId: 1,
  endDate: '2024-03-04 14:12',
  title: '42GG 모집 1기',
  contents: sampleContents,
  forms: userAnswerOne,
};

const applicationInfoTwo = {
  applicationId: 2,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 2기',
  contents: sampleContents,
  forms: userAnswerTwo,
};

const applicationInfoThree = {
  applicationId: 3,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 3기',
  contents: sampleContents,
  forms: userAnswerTwo,
};
const applicationInfoFour = {
  applicationId: 4,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 4기',
  contents: sampleContents,
  forms: userAnswerTwo,
};
const applicationInfoFive = {
  applicationId: 5,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 5기',
  contents: sampleContents,
  forms: userAnswerTwo,
};

const applicationInfoSix = {
  applicationId: 6,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 6기',
  contents: sampleContents,
  forms: userAnswerTwo,
};

const applicationInfoSeven = {
  applicationId: 7,
  endDate: '2024-12-12 00:12',
  title: '42GG 모집 7기',
  contents: sampleContents,
  forms: userAnswerTwo,
};

const applications = [
  applicationInfoOne,
  applicationInfoTwo,
  applicationInfoThree,
  applicationInfoFour,
  applicationInfoFive,
  applicationInfoSix,
  applicationInfoSeven,
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, applicationId } = req.query as {
    id: string;
    applicationId: string;
  };

  const recruitId = parseInt(id);
  const applyId = parseInt(applicationId);

  if (req.method === 'GET') {
    if (recruitId > 0 && recruitId <= applications.length) {
      res.status(200).json(applications[recruitId - 1]);
    } else {
      res.status(200).json({});
    }
  }
  if (req.method === 'DELETE') {
    console.log(
      'DELETE SUCCESS, id => ',
      recruitId,
      'applicationId => ',
      applyId
    );
    res.status(204).send('DELETE');
  }
  if (req.method === 'PATCH') {
    console.log(
      'PATCH SUCCESS, id => ',
      recruitId,
      'applicationId => ',
      applyId
    );
    console.log(req.body);
    res.status(204).send('UPDATED');
  }
}
