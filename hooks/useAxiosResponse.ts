import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { instance } from 'utils/axios';
import Cookies from 'js-cookie';
import { loginState } from 'utils/recoil/login';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';

export default function useAxiosResponse() {
  const setLogin = useSetRecoilState(loginState);
  const [token, setToken] = useState<string>('');
  const [isRecalling, setIsRecalling] = useState(false);
  const setError = useSetRecoilState(errorState);

  const accessTokenHandler = async () => {
    try {
      const res = await instance.post(
        `/pingpong/users/accesstoken?refreshToken=${token}`
      );
      localStorage.setItem('42gg-token', res.data.accessToken);
    } catch (error) {
      setError('SW05');
    }
  };

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
		const refreshToken = Cookies.get('refresh_token');
		if (refreshToken) {
			setToken(refreshToken);
		} 
		else {
      		setLogin(false);
		}
    } else if (localStorage.getItem('42gg-token')) {
      setLogin(true);
    } else {
      accessTokenHandler();
      setLogin(true);
    }
  }, [token]);

  useEffect(() => {
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
}
