import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { loginState } from 'utils/recoil/login';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export default function useAxiosResponse() {
  const setLogin = useSetRecoilState(loginState);
  const token = Cookies.get('refresh_token');
  const [isRecalling, setIsRecalling] = useState(false);

  const errorResponseHandler = async (error: AxiosError) => {
    if (error.response && error.response.status === 401 && !isRecalling) {
      setIsRecalling(true);
      const refreshToken = Cookies.get('refresh_token');
      try {
        const res = await instance.post(
          `/pingpong/users/accesstoken?refreshToken=${refreshToken}`
        );
        localStorage.setItem('42gg-token', res.data.accessToken);
        setIsRecalling(false);
        return instance.request(error.config);
      } catch (error) {
        setIsRecalling(false);
        return Promise.reject(error);
      }
    } else {
      if (isRecalling === true) {
        setLogin(false);
        setIsRecalling(false);
      }
      return Promise.reject(error);
    }
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorResponseHandler
  );

  useEffect(() => {
    if (!token) {
      setLogin(false);
    }
  }, [token]);

  useEffect(() => {
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
}
