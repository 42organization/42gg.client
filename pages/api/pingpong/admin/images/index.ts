import { NextApiRequest, NextApiResponse } from 'next';
import { Iprofile } from 'types/admin/adminReceiptType';

interface IprofileRes {
  profileList: Array<Iprofile>;
  totalPage: number;
}

const profile1: Iprofile = {
  profileId: 1,
  date: new Date('2023-08-05 10:10:10'),
  intraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
};

const profile2: Iprofile = {
  profileId: 2,
  date: new Date('2023-08-04 20:30:10'),
  intraId: 'hyobicho',
  imageUri: '/image/noti_empty.svg',
};

const profile3: Iprofile = {
  profileId: 3,
  date: new Date('2023-07-05 10:10:10'),
  intraId: 'sangmipa',
  imageUri: '/image/noti_empty.svg',
};

const profile4: Iprofile = {
  profileId: 4,
  date: new Date('2023-07-04 20:30:10'),
  intraId: 'jeyoon',
  imageUri: '/image/noti_empty.svg',
};

const profile5: Iprofile = {
  profileId: 5,
  date: new Date('2023-07-01 10:10:10'),
  intraId: 'hyungjpa1',
  imageUri: '/image/noti_empty.svg',
};

const profile6: Iprofile = {
  profileId: 6,
  date: new Date('2023-08-05 10:10:10'),
  intraId: 'hyungjpa',
  imageUri: '/image/noti_empty.svg',
};

const profile7: Iprofile = {
  profileId: 7,
  date: new Date('2023-08-04 20:30:10'),
  intraId: 'hyobicho',
  imageUri: '/image/noti_empty.svg',
};

const profile8: Iprofile = {
  profileId: 8,
  date: new Date('2023-07-05 10:10:10'),
  intraId: 'sangmipa',
  imageUri: '/image/noti_empty.svg',
};

const profile9: Iprofile = {
  profileId: 9,
  date: new Date('2023-07-04 20:30:10'),
  intraId: 'jeyoon',
  imageUri: '/image/noti_empty.svg',
};

const profile10: Iprofile = {
  profileId: 10,
  date: new Date('2023-07-01 10:10:10'),
  intraId: 'hyungjpa1',
  imageUri: '/image/noti_empty.svg',
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
        (profile: Iprofile) => profile.intraId === intraId
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
