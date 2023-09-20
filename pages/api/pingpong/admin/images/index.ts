import { NextApiRequest, NextApiResponse } from 'next';
import { Iprofile } from 'types/admin/adminReceiptType';

interface IprofileRes {
  profileList: Array<Iprofile>;
  totalPage: number;
}

const profile1: Iprofile = {
  id: 1,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile2: Iprofile = {
  id: 2,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile3: Iprofile = {
  id: 3,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile4: Iprofile = {
  id: 4,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile5: Iprofile = {
  id: 5,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile6: Iprofile = {
  id: 6,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile7: Iprofile = {
  id: 7,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile8: Iprofile = {
  id: 8,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile9: Iprofile = {
  id: 9,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profile10: Iprofile = {
  id: 10,
  createdAt: new Date('2023-08-05 10:10:10'),
  deletedAt: new Date('2023-08-05 10:10:10'),
  userIntraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
  isCurrent: true,
};

const profileList: Array<Iprofile> = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
  profile10,
];

const resEmpty: IprofileRes = {
  profileList: [],
  totalPage: 0,
};

const resOne: IprofileRes = {
  profileList: profileList.slice(0, 8),
  totalPage: 1,
};

const resTwo: IprofileRes = {
  profileList: profileList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { intraId, page } = query as { intraId: string; page: string };

  // const temp: IprofileRes = resEmpty;
  // const temp: IprofileRes = resOne;
  const temp: IprofileRes = resTwo;

  const resData: IprofileRes = {
    profileList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (intraId) {
      resData.profileList = temp.profileList.filter(
        (profile: Iprofile) => profile.userIntraId === intraId
      );
      resData.totalPage = 1;
    } else {
      if (page) {
        if (parseInt(page) === resData.totalPage) {
          resData.profileList = temp.profileList.slice(0, 5);
        } else {
          resData.profileList = temp.profileList;
        }
      }
    }
    res.status(200).json(resData);
  }
}
