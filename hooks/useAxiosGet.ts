import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { instance } from 'utils/axios';
import { Noti } from 'types/notiTypes';
import { CurrentMatchList, Match } from 'types/matchTypes';
import { SeasonList } from 'types/seasonTypes';
import { Live, User } from 'types/mainType';
import { PppChart, ProfileBasic, ProfileRank } from 'types/userTypes';
import { UserInfo } from 'types/admin/adminUserTypes';
import { EditedSchedule } from 'types/admin/adminSlotTypes';
import { AfterGame } from 'types/scoreTypes';
import { GameResult } from 'types/gameTypes';

interface useAxiosGetProps<T> {
  url: string;
  setState: Dispatch<SetStateAction<T>>;
  err: string;
  type: null | string;
}

const useAxiosGet = <T>({
  url,
  setState,
  err,
  type,
}: useAxiosGetProps<T>): (() => void) => {
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
