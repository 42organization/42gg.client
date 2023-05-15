import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import { Noti } from 'types/notiTypes';
import { CurrentMatch, Match } from 'types/matchTypes';
import { SeasonList } from 'types/seasonTypes';
import { Live, User } from 'types/mainType';
import { PppChart, ProfileBasic, ProfileRank } from 'types/userTypes';
import { UserInfo } from 'types/admin/adminUserTypes';
import { EditedSchedule } from 'types/admin/adminSlotTypes';
import { AfterGame } from 'types/scoreTypes';

interface useAxiosGetProps {
  url: string;
  setState:
    | Dispatch<SetStateAction<boolean>>
    | Dispatch<SetStateAction<Noti[]>>
    | Dispatch<SetStateAction<Match | null>>
    | Dispatch<SetStateAction<ProfileRank>>
    | Dispatch<SetStateAction<PppChart[]>>
    | Dispatch<SetStateAction<UserInfo>>
    | Dispatch<SetStateAction<string[]>>
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<EditedSchedule>>
    | Dispatch<SetStateAction<AfterGame>>
    | Dispatch<SetStateAction<undefined>>
    | SetterOrUpdater<User>
    | SetterOrUpdater<SeasonList>
    | SetterOrUpdater<CurrentMatch>
    | SetterOrUpdater<Live>
    | SetterOrUpdater<CurrentMatch>
    | SetterOrUpdater<ProfileBasic>;
  err: string;
  type: null | string;
}

const useAxiosGet = ({
  url,
  setState,
  err,
  type,
}: useAxiosGetProps): (() => void) => {
  const setError = useSetRecoilState<string>(errorState);

  const axiosGet = async () => {
    try {
      const res = await instance.get(url);
      setState(res?.data);
    } catch (e) {
      if (type === 'alert') {
        alert(e);
      } else if (type === 'console') {
        console.log(err);
      } else if (type === 'setError') {
        setError(err);
      }
    }
  };
  return axiosGet;
};

export default useAxiosGet;
