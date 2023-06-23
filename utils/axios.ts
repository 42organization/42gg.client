import axios from 'axios';
import Cookies from 'js-cookie';
import useLogoutCheck from 'hooks/Login/useLogoutCheck';

const baseURL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
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
    const [onLogout] = useLogoutCheck();
    onLogout();
    throw error;
  }
};

const setAuthHeaders = (config: any) => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  return config;
};

const handleAuthError = async (error: any, originalRequest: any) => {
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    await refreshAccessToken();
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return axios(originalRequest);
  }
  return Promise.reject(error);
};

// Add a request interceptor to set authorization headers
instance.interceptors.request.use(
  async function (config) {
    if (accessToken) {
      setAuthHeaders(config);
    } else {
      await refreshAccessToken();
      setAuthHeaders(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return handleAuthError(error, error.config);
  }
);

// Add a request interceptor for instanceInManage
instanceInManage.interceptors.request.use(
  async function (config) {
    if (accessToken) {
      setAuthHeaders(config);
    } else {
      await refreshAccessToken();
      setAuthHeaders(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor for instanceInManage
instanceInManage.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return handleAuthError(error, error.config);
  }
);

export { instance, instanceInManage };
