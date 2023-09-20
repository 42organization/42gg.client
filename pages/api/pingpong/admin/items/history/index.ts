import { NextApiRequest, NextApiResponse } from 'next';
import { IitemHistory } from 'types/admin/adminStoreTypes';

interface IitemHistoryRes {
  itemHistoryList: Array<IitemHistory>;
  totalPage: number;
}

const itemHistory1: IitemHistory = {
  itemId: 1,
  createdAt: new Date('2023-08-05 20:10:10'),
  name: '이미지 변경권',
  mainContent: '프사 바꿔',
  subContent: '프로필 이미지를 원하는 이미지로 변경할 수 있는 아이템입니다.',
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
  name: '확성기',
  mainContent: '오늘 42GG는 내가 접수한다📢😎',
  subContent:
    '24시간 동안 모든 페이지 상단에 메시지를 띄울 수 있는 아이템입니다. 사용 다음날 적용됩니다.',
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
  name: '배경 뽑기',
  mainContent: '난 “Background”부터가 달라',
  subContent: '랜덤으로 내 프로필 페이지의 배경을 변경할 수 있는 아이템입니다.',
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
  name: 'Edge 뽑기',
  mainContent: '난 “Edge”로 말해..',
  subContent: '랜덤으로 프로필 테두리 색상을 변경할 수 있는 아이템입니다.',
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
  name: 'ID 색깔 변경권',
  mainContent: '남들과는 다르게! ID 색깔을 바꿔보세요!',
  subContent:
    '색상코드를 직접 입력하여 랭킹 페이지의 ID 색상을 바꿀 수 있는 아이템입니다.',
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
