import axios from 'axios';

const baseURL: any = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;

    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
    };
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export default instance;
