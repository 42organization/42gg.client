import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import getAgendaSnackBarInfo from 'utils/agenda/getAgendaSnackBarInfo';
import { instanceInAgenda, instanceInManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export default function useAxiosWithToast(instance: AxiosInstance) {
  const setSnackbar = useSetRecoilState(toastState);

  const getRequestRoute = (apiUrl: string) =>
    apiUrl.split('/').slice(3).join('/');

  const errorRequestHandler = (error: AxiosError) => {
    setSnackbar({
      toastName: 'request error',
      severity: 'error',
      message: `🔥 ${error.status}: ${error.message} 🔥`,
      clicked: true,
    });
  };

  const errorResponseHandler = (error: AxiosError) => {
    let errorDataMessage = (error.response?.data as { message?: string })
      ?.message;
    if (!errorDataMessage) {
      errorDataMessage = error.message;
    }
    console.log(error);
    setSnackbar({
      toastName: `response error`,
      severity: 'error',
      message: `🔥 ${errorDataMessage} 🔥`,
      clicked: true,
    });

    return Promise.reject(error);
  };

  const requestHandler = (config: AxiosRequestConfig) => {
    return config;
  };

  const responseHandler = (response: AxiosResponse) => {
    const { status, config } = response;
    const { method, url } = config;
    let parseUrl = '';

    if (url) {
      parseUrl = url[0] === '/' ? url : '/' + url;
    }

    console.log(response);
    /** GET API에서는 Snackbar 호출 X */
    if (instance === instanceInAgenda && method === 'get') return response;
    if (instance === instanceInManage && method === 'get') return response;

    /**
     * Snackbar 호출
     * - getAgendaSnackBarInfo함수에서 파싱하여 Snackbar의 유형(색상), 메시지 가져오기
     *  */
    if (method && url && 200 <= status && status < 300) {
      const { severity, message } = getAgendaSnackBarInfo(method, parseUrl);

      switch (severity) {
        case 'success':
          setSnackbar({
            toastName: `response success`,
            severity: 'success',
            message: `🎉 ${message} 🎉`,
            clicked: true,
          });
          break;
        case 'info':
          setSnackbar({
            toastName: `response info`,
            severity: 'info',
            message: `🤔 ${message} 🤔`,
            clicked: true,
          });
          break;
        default:
          setSnackbar({
            toastName: `response default`,
            severity: 'success',
            message: `${message || '성공했습니다.'}'`,
            clicked: true,
          });
      }
    }
    return response;
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
