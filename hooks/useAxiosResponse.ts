import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { instance } from 'utils/axios';
import Cookies from 'js-cookie';
import { loginState } from 'utils/recoil/login';
import { useSetRecoilState } from 'recoil';

export default function useAxiosResponse() {
  const errorResponseHandler = async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refresh_token');
      try {
        const res = await instance.post(
          `/pingpong/users/accesstoken?refreshToken=${refreshToken}`
        );
        localStorage.setItem('42gg-token', res.data.accessToken);
        return instance.request(error.config);
      } catch (error) {
        const setLoggedIn = useSetRecoilState<boolean>(loginState);
        setLoggedIn(false);
      }
    } else {
      return Promise.reject(error);
    }
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorResponseHandler
  );

  useEffect(() => {
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
}
