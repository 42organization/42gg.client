import { NextApiRequest, NextApiResponse } from 'next';
import { IitemHistory } from 'types/admin/adminStoreTypes';

interface IitemHistoryRes {
  itemHistoryList: Array<IitemHistory>;
  totalPage: number;
}

const itemHistory1: IitemHistory = {
  itemId: 1,
  createdAt: new Date('2023-08-05 20:10:10'),
  name: '확성기',
  content:
    '설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다',
  imageUri: '/image/menu_manual.svg',
  price: 42,
  discount: 50,
  creatorIntraId: 'hyungjpa',
  deleterIntraId: 'hyungjpa',
  visible: true,
};

const itemHistory2: IitemHistory = {
  itemId: 2,
  createdAt: new Date('2023-08-04 20:10:10'),
  name: '프로필 변경권',
  content: '설명입니다',
  imageUri: '/image/menu_manual.svg',
  price: 50,
  discount: 50,
  creatorIntraId: 'hyungjpa',
  deleterIntraId: '',
  visible: true,
};

const itemHistory3: IitemHistory = {
  itemId: 3,
  createdAt: new Date('2023-08-03 20:10:10'),
  name: '프로필 배경 변경권',
  content:
    '설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다',
  imageUri: '/image/menu_manual.svg',
  price: 20,
  discount: 50,
  creatorIntraId: 'hyungjpa',
  deleterIntraId: 'hyungjpa',
  visible: true,
};

const itemHistory4: IitemHistory = {
  itemId: 4,
  createdAt: new Date('2023-08-02 20:10:10'),
  name: '프로필 테두리 변경권',
  content: '설명입니다',
  imageUri: '/image/menu_manual.svg',
  price: 10,
  discount: 50,
  creatorIntraId: 'hyungjpa',
  deleterIntraId: 'hyungjpa',
  visible: false,
};

const itemHistory5: IitemHistory = {
  itemId: 5,
  createdAt: new Date('2023-08-01 20:10:10'),
  name: '확성기',
  content: '설명입니다',
  imageUri: '/image/menu_manual.svg',
  price: 42,
  discount: 50,
  creatorIntraId: 'hyungjpa',
  deleterIntraId: '',
  visible: false,
};

const itemHistoryList: Array<IitemHistory> = [
  itemHistory1,
  itemHistory2,
  itemHistory3,
  itemHistory4,
  itemHistory5,
];

const resEmpty: IitemHistoryRes = {
  itemHistoryList: [],
  totalPage: 0,
};

const resOne: IitemHistoryRes = {
  itemHistoryList: itemHistoryList.slice(0, 3),
  totalPage: 1,
};
const resTwo: IitemHistoryRes = {
  itemHistoryList: itemHistoryList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };

  // const temp: IitemHistoryRes = resEmpty;
  // const temp: IitemHistoryRes = resOne;
  const temp: IitemHistoryRes = resTwo;

  const resData: IitemHistoryRes = {
    itemHistoryList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (page) {
      if (parseInt(page) === resData.totalPage) {
        resData.itemHistoryList = temp.itemHistoryList.slice(0, 3);
      } else {
        resData.itemHistoryList = temp.itemHistoryList;
      }
    }
    res.status(200).json(resData);
  }
}
