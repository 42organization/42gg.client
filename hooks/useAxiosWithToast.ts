import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toastState } from 'utils/recoil/toast';
import instance from 'utils/axios';

export default function useAxiosWithToast() {
  const setSnackbar = useSetRecoilState(toastState);

  const checkAdminURL = (url: string) => url.includes('admin');

  const errorRequestHandler = (error: AxiosError) => {
    setSnackbar({
      toastName: 'error',
      severity: 'error',
      message: `🔥 ${error.status}: ${error.message} 🔥`,
      clicked: true,
    });
  };

  const errorResponseHandler = (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        setSnackbar({
          toastName: 'unauthorized',
          severity: 'error',
          message: `🔥 ${error.message} 🔥`,
          clicked: true,
        });
        break;
      case 403:
        setSnackbar({
          toastName: 'forbidden',
          severity: 'error',
          message: `🔥 ${error.message} 🔥`,
          clicked: true,
        });
        break;
      default:
        setSnackbar({
          toastName: 'error',
          severity: 'error',
          message: `🔥 ${error.status}: ${error.message} 🔥`,
          clicked: true,
        });
        break;
    }
  };

  const responseHandler = (response: AxiosResponse) => {
    const { status, config } = response;
    const { method, url } = config;

    // * Admin page가 아니면 toast를 띄우지 않는다.
    if (!checkAdminURL(url as string)) return response;
    if (method === 'get' && status === 200) return response;

    // PUT feedback
    if (url?.includes('feedback')) {
      setSnackbar({
        toastName: 'feedback success',
        severity: 'info',
        message: `피드백 상태가 변경되었습니다.`,
        clicked: true,
      });
      return response;
    }
    // ? 많이 발생하는 status code 파악 중요
    switch (response.status) {
      case 201:
        setSnackbar({
          toastName: 'create success',
          severity: 'success',
          message: `🎉 ${response.data.message} 🎉`,
          clicked: true,
        });
        break;
      default:
        break;
    }
    return response;
  };

  const requestHandler = (config: AxiosRequestConfig) => {
    return config;
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorRequestHandler(error.response.data)
  );

  const requestInterceptor = instance.interceptors.request.use(
    (config) => requestHandler(config),
    (error) => errorResponseHandler(error.response.data)
  );

  useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}
