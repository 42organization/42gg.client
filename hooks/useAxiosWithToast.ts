import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toastState } from 'utils/recoil/toast';
import instance from 'utils/axios';

export default function useAxiosWithToast() {
  const setSnackbar = useSetRecoilState(toastState);

  const checkAdminURL = (url: string) => url.includes('admin');

  const getRequestRoute = (apiUrl: string) =>
    apiUrl.split('/').slice(3).join('/');

  const errorRequestHandler = (error: AxiosError) => {
    if (!checkAdminURL(error.config.url as string)) throw error;

    setSnackbar({
      toastName: 'request error',
      severity: 'error',
      message: `🔥 ${error.status}: ${error.message} 🔥`,
      clicked: true,
    });
  };

  const errorResponseHandler = (error: AxiosError) => {
    if (!checkAdminURL(error.config.url as string)) throw error;

    switch (error.response?.status) {
      case 400:
        setSnackbar({
          toastName: `bad request`,
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
      case 413:
        setSnackbar({
          toastName: 'file size error',
          severity: 'error',
          message: `🔥 ${error.message} 🔥`,
          clicked: true,
        });
        break;
      case 415:
        setSnackbar({
          toastName: 'file extension error',
          severity: 'error',
          message: `🔥 ${error.message} 🔥`,
          clicked: true,
        });
        break;
      default:
        setSnackbar({
          toastName: 'default error',
          severity: 'error',
          message: `🔥 ${error.code}: ${error.message} 🔥`,
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

    switch (status) {
      case 200:
        setSnackbar({
          toastName: `${getRequestRoute(url as string)} success`,
          severity: 'success',
          message: `🎉 ${response.data.message || '성공했습니다!'} 🎉`,
          clicked: true,
        });
        break;
      case 207:
        setSnackbar({
          toastName: `${getRequestRoute(url as string)} info`,
          severity: 'info',
          message: `🤔 ${response.data.message || '성공했습니다!'} 🤔`,
          clicked: true,
        });
        break;
      default:
        setSnackbar({
          toastName: `${getRequestRoute(url as string)} info`,
          severity: 'info',
          message: `default: ${response.data.message} at ${getRequestRoute(
            url as string
          )}`,
          clicked: true,
        });
        break;
    }
    return response;
  };

  const requestHandler = (config: AxiosRequestConfig) => {
    return config;
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorResponseHandler(error)
  );

  const requestInterceptor = instance.interceptors.request.use(
    (config) => requestHandler(config),
    (error) => errorRequestHandler(error)
  );

  useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}
