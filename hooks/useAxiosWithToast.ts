import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';
import instance from '../utils/axios';

export default function useAxiosWithToast() {
  const setSnackbar = useSetRecoilState(toastState);

  const checkAdminURL = (url: string) => url.includes('admin');

  const errorHandler = (error: AxiosError) => {
    const msg = error.message;

    setSnackbar({
      toastName: 'error',
      severity: 'error',
      message: `🔥 ${msg} 🔥`,
      clicked: true,
    });
  };

  const responseHandler = (response: AxiosResponse) => {
    // * Admin page가 아니면 toast를 띄우지 않는다.
    if (!checkAdminURL(response.config.url as string)) return response;
    if (response.config.method === 'get') return response;

    const requestURL = response.config.url;
    // PUT feedback
    if (requestURL?.includes('feedback')) {
      setSnackbar({
        toastName: 'feedback success',
        severity: 'info',
        message: `피드백 상태가 변경되었습니다.`,
        clicked: true,
      });
      return response;
    }

    return response;
  };

  const requestHandler = (config: AxiosRequestConfig) => {
    return config;
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error.response.data)
  );

  const requestInterceptor = instance.interceptors.request.use(
    (config) => requestHandler(config),
    (error) => errorHandler(error.response.data)
  );

  useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}
