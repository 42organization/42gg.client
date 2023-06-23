import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
const manageBaseURL = process.env.NEXT_PUBLIC_MANAGE_SERVER_ENDPOINT ?? '/';

const instance = axios.create({ baseURL });
const instanceInManage = axios.create({ baseURL: manageBaseURL });

instance.interceptors.request.use(
  function setConfig(config) {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
    };
    config.withCredentials = true; // Add the withCredentials option
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

instanceInManage.interceptors.request.use(
  function setConfig(config) {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
    };
    config.withCredentials = true; // Add the withCredentials option
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

const responseInterceptor = instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = Cookies.get('refresh_token');
        const res = await instance.post(
          `/pingpong/users/accesstoken?refreshToken=${refreshToken}`
        );
        localStorage.setItem('42gg-token', res.data.accessToken);
      } catch (error) {
        const setLoggedIn = useSetRecoilState<boolean>(loginState);
        setLoggedIn(false);
      }
    }
    return Promise.reject(error);
  }
);

useEffect(() => {
  return () => {
    instance.interceptors.request.eject(responseInterceptor);
  };
}, [responseInterceptor]);

export { instance, instanceInManage };
