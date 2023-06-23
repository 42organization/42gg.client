import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;
const manageBaseURL = process.env.NEXT_PUBLIC_MANAGE_SERVER_ENDPOINT ?? '/';

const instance = axios.create({ baseURL });
const instanceInManage = axios.create({ baseURL: manageBaseURL });

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refresh_token'); // Get the refresh token from the cookie
    const response = await instanceInManage.post(
      `/pingpong/users/accessToken?refreshToken=${refreshToken}`
    );
    const newAccessToken = response.data.accessToken;

    // Update the access token in localStorage
    localStorage.setItem('42gg-token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // Handle error while refreshing the access token
    throw new Error('Failed to refresh access token');
  }
};

// Axios interceptor for refreshing the access token
instance.interceptors.response.use(
  function onSuccess(response) {
    return response;
  },
  async function onError(error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (error) {
        // Handle error while refreshing the access token or retrying the original request
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Request interceptor to set headers and withCredentials option
const requestInterceptor = function setConfig(config: any) {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
  };
  config.withCredentials = true; // Add the withCredentials option
  return config;
};

// Add request interceptor to both instances
instance.interceptors.request.use(requestInterceptor);
instanceInManage.interceptors.request.use(requestInterceptor);

export { instance, instanceInManage };
