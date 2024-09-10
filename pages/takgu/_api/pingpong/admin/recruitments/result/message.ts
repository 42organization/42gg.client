import {
  IRecruitmentTemplate,
  IRecruitmentTemplateList,
} from 'types/takgu/recruit/recruitments';
import type { NextApiRequest, NextApiResponse } from 'next';

const messageList: IRecruitmentTemplate[] = [
  {
    messageId: 1,
    messageType: 'INTERVIEW',
    isUse: true,
    message: '면접에 합격하셨습니다. 면접 일정은 ${선택날짜}입니다.',
  },
  {
    messageId: 2,
    messageType: 'PASS',
    isUse: true,
    message: '합격하셨습니다. 합격자 안내 메일을 확인해주세요.',
  },
  {
    messageId: 3,
    messageType: 'FAIL',
    isUse: true,
    message: '아쉽지만 불합격하셨습니다. 다음 기회에 도전해주세요.',
  },
  {
    messageId: 4,
    messageType: 'FAIL',
    isUse: true,
    message: '아쉽지만 불합격하셨습니다. 다음 기회에 도전해주세요.',
  },
];

const templateList: IRecruitmentTemplateList = {
  messages: messageList,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(templateList);
  } else if (method === 'POST') {
    res.status(201).end();
  }
}
