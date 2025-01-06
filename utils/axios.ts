import axios, { AxiosError } from 'axios';

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

instance.interceptors.request.use(
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

instanceInManage.interceptors.request.use(
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

instanceInPartyManage.interceptors.request.use(
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

instanceInAgenda.interceptors.request.use(
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
