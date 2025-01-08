import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
const manageBaseURL = process.env.NEXT_PUBLIC_MANAGE_SERVER_ENDPOINT ?? '/';
const managePartyBaseURL =
  process.env.NEXT_PUBLIC_PARTY_MANAGE_SERVER_ENDPOINT ?? '/';
const agendaBaseURL = process.env.NEXT_PUBLIC_AGENDA_SERVER_ENDPOINT ?? '/';
const calendarBaseURL = process.env.NEXT_PUBLIC_CALENDAR_SERVER_ENDPOINT ?? '/';

const instance = axios.create({ baseURL });
const instanceInManage = axios.create({ baseURL: manageBaseURL });
const instanceInPartyManage = axios.create({ baseURL: managePartyBaseURL });
const instanceInAgenda = axios.create({ baseURL: agendaBaseURL });
const instanceInCalendar = axios.create({ baseURL: calendarBaseURL });

instance.interceptors.request.use(setConfig, getError);
instanceInManage.interceptors.request.use(setConfig, getError);
instanceInPartyManage.interceptors.request.use(setConfig, getError);
instanceInAgenda.interceptors.request.use(setConfig, getError);

instanceInCalendar.interceptors.request.use(
  function setConfig(config) {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
    };
    config.withCredentials = true;
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

function isAxiosError<ErrorPayload>(
  error: unknown
): error is AxiosError<ErrorPayload> {
  return axios.isAxiosError(error);
}

export {
  instance,
  instanceInManage,
  instanceInPartyManage,
  instanceInAgenda,
  instanceInCalendar,
  isAxiosError,
};

function setConfig<T>(config: AxiosRequestConfig<T>) {
  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('42gg-token') ?? ''}`,
      withCredentials: true,
    },
  };
}

function getError(error: unknown) {
  return Promise.reject(error);
}
