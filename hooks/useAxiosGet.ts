import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';

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
        console.log(err); // test
      } else if (type === 'setError') {
        setError(err);
      }
    }
  };
  return axiosGet;
};

export const useMockAxiosGet = <T>({
  url,
  setState,
  err,
  type,
}: useAxiosGetProps<T>): (() => void) => {
  const setError = useSetRecoilState<string>(errorState);
  const axiosGet = async () => {
    try {
      const res = await mockInstance.get(url);
      setState(res?.data);
    } catch (e) {
      if (type === 'alert') {
        alert(e);
      } else if (type === 'console') {
        console.log(err); // test
      } else if (type === 'setError') {
        setError(err);
      }
    }
  };
  return axiosGet;
};

export default useAxiosGet;
