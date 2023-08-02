import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_MOCK_ENDPOINT}`;

const mockInstance = axios.create({ baseURL });

mockInstance.interceptors.request.use(
  function setConfig(config) {
    config.headers = {
      'Content-Type': 'application/json',
    };
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export { mockInstance };
