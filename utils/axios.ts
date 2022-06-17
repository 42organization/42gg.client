import axios from 'axios';

const SERVER = 'http://211.253.28.235:9090';
const LOCAL = 'http://localhost:3000/api';

export const getData = async (path: string, isServer = false) => {
  try {
    const END_POINT = isServer ? SERVER : LOCAL;
    const res = await axios.get(`${END_POINT}${path}`);
    if (Math.round(res.status / 200) !== 1) {
      throw new Error('네트워크 에러');
    }
    return await res;
  } catch (e) {
    // throw new Error(e);
  }
};

export const postData = async (
  path: string,
  body: unknown,
  isServer = false
) => {
  try {
    const END_POINT = isServer ? SERVER : LOCAL;
    const res = await axios.post(`${END_POINT}${path}`, body);
    if (Math.round(res.status / 200) !== 1) throw new Error('네트워크 에러');
    return await res;
  } catch (e) {
    // throw new Error(e);
  }
};

export const deleteData = async (path: string, isServer = false) => {
  try {
    const END_POINT = isServer ? SERVER : LOCAL;
    const res = await axios.delete(`${END_POINT}${path}`);
    if (res.statusText !== 'OK') throw new Error('네트워크 에러');
    return await res;
  } catch (e) {
    // throw new Error(e);
  }
};
