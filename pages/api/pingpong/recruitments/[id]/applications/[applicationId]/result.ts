import { NextApiRequest, NextApiResponse } from 'next';

const before = {
  title: '지원서 작성 전입니다~',
  status: null,
  interviewDate: null,
};

const beforeInterview = {
  title: '면접 시간 발표 전입니다~',
  status: 'PROGRESS',
  interviewDate: null,
};

const afterInterview = {
  title: '면접 시간 나왔습니다~',
  status: 'INTERVIEW',
  interviewDate: new Date(),
};

const pass = {
  title: '합격 축하드립니다!',
  status: 'PASS',
  interviewDate: new Date(),
};

const applicationFail = {
  title: '지원서 불합격입니다ㅠㅠ',
  status: 'APPLICATION_FAIL',
  interviewDate: null,
};

const interviewFail = {
  title: '면접 불합격입니다ㅠㅠ',
  status: 'INTERVIEW_FAIL',
  interviewDate: new Date(),
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  switch (id) {
    case '1':
      return res.status(200).json(before);
    case '2':
      return res.status(200).json(beforeInterview);
    case '3':
      return res.status(200).json(afterInterview);
    case '4':
      return res.status(200).json(pass);
    case '5':
      return res.status(200).json(applicationFail);
    case '6':
      return res.status(200).json(interviewFail);
    default:
      return res.status(404).json(before);
  }
}
