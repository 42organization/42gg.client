import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
const manageBaseURL = process.env.NEXT_PUBLIC_MANAGE_SERVER_ENDPOINT ?? '/';

const instance = axios.create({ baseURL, withCredentials: true });
const instanceInManage = axios.create({
  baseURL: manageBaseURL,
  withCredentials: true,
});

let accessToken = '';

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    const response = await axios.post(
      `${baseURL}/pingpong/users/accesstoken?refreshToken=${refreshToken}`
    );
    accessToken = response.data.access_token; // Update the access token
    return accessToken;
  } catch (error) {
    // Handle error, e.g., redirect to login page
    // throw error;
  }
};

instance.interceptors.request.use(
  async function setConfig(config) {
    if (accessToken) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        };
      } catch (error) {
        // Handle error
        // throw error;
      }
    }
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function handleResponse(response) {
    return response;
  },
  async function handleErrorResponse(error) {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

instanceInManage.interceptors.request.use(
  async function setConfig(config) {
    if (accessToken) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        };
      } catch (error) {
        // Handle error
        // throw error;
      }
    }
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

instanceInManage.interceptors.response.use(
  function handleResponse(response) {
    return response;
  },
  async function handleErrorResponse(error) {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { instance, instanceInManage };
