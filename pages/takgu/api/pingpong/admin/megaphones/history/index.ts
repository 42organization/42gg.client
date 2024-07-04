import { NextApiRequest, NextApiResponse } from 'next';
import { Imegaphone } from 'types/takgu/admin/adminReceiptType';

interface ImegaphoneRes {
  megaphoneList: Array<Imegaphone>;
  totalPage: number;
}

const megaphone1: Imegaphone = {
  megaphoneId: 1,
  content:
    '확성기입니다확성기입니다확성기입니다확성기입니다확성기입니다확성기입니다',
  usedAt: new Date('2023-08-05 10:10:10'),
  status: '사용 중',
  intraId: 'hyungjpa',
};

const megaphone2: Imegaphone = {
  megaphoneId: 2,
  content:
    '확성기입니다확성기입니다확성기입니다확성기입니다확성기입니다확성기입니다',
  usedAt: new Date('2023-07-05 10:10:10'),
  status: '사용 중',
  intraId: 'hyobicho',
};

const megaphone3: Imegaphone = {
  megaphoneId: 3,
  content: '확성기입니다',
  usedAt: new Date('2023-07-05 06:10:10'),
  status: '사용 중',
  intraId: 'sangmipa',
};

const megaphone4: Imegaphone = {
  megaphoneId: 4,
  content: '확성기입니다',
  usedAt: new Date('2023-07-03 10:10:10'),
  status: '사용 중',
  intraId: 'jeyoon',
};

const megaphone5: Imegaphone = {
  megaphoneId: 5,
  content: '확성기입니다',
  usedAt: new Date('2023-07-02 10:20:10'),
  status: '사용 대기',
  intraId: 'hyungjpa',
};

const megaphone6: Imegaphone = {
  megaphoneId: 6,
  content: '확성기입니다',
  usedAt: new Date('2023-06-05 10:10:10'),
  status: '사용 대기',
  intraId: 'jeyoon',
};

const megaphone7: Imegaphone = {
  megaphoneId: 7,
  content: '확성기입니다',
  usedAt: new Date('2023-06-05 10:00:10'),
  status: '사용 대기',
  intraId: 'hyungjpa',
};

const megaphone8: Imegaphone = {
  megaphoneId: 8,
  content: '확성기입니다',
  usedAt: new Date('2023-05-05 10:10:10'),
  status: '사용 완료',
  intraId: 'sangmipa',
};

const megaphone9: Imegaphone = {
  megaphoneId: 9,
  content: '확성기입니다',
  usedAt: new Date('2023-05-04 10:10:10'),
  status: '사용 완료',
  intraId: 'sangmipa',
};

const megaphone10: Imegaphone = {
  megaphoneId: 10,
  content: '확성기입니다',
  usedAt: new Date('2023-05-03 10:10:10'),
  status: '사용 완료',
  intraId: 'hyobicho',
};

const megaphoneList: Array<Imegaphone> = [
  megaphone1,
  megaphone2,
  megaphone3,
  megaphone4,
  megaphone5,
  megaphone6,
  megaphone7,
  megaphone8,
  megaphone9,
  megaphone10,
];

const resEmpty: ImegaphoneRes = {
  megaphoneList: [],
  totalPage: 0,
};

const resOne: ImegaphoneRes = {
  megaphoneList: megaphoneList.slice(0, 8),
  totalPage: 1,
};

const resTwo: ImegaphoneRes = {
  megaphoneList: megaphoneList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { intraId, page } = query as { intraId: string; page: string };

  // const temp: ImegaphoneTable = resEmpty;
  // const temp: ImegaphoneTable = resOne;
  const temp: ImegaphoneRes = resTwo;

  const resData: ImegaphoneRes = {
    megaphoneList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (intraId) {
      resData.megaphoneList = temp.megaphoneList.filter(
        (megaphone: Imegaphone) => megaphone.intraId === intraId
      );
      resData.totalPage = 1;
    } else {
      if (page) {
        if (parseInt(page) === resData.totalPage) {
          resData.megaphoneList = temp.megaphoneList.slice(0, 5);
        } else {
          resData.megaphoneList = temp.megaphoneList;
        }
      }
    }
    res.status(200).json(resData);
  }
}
