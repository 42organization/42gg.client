import axios from 'axios';

const END_POINT = 'http://localhost:3000';

export const getData = async (path: string) => {
  try {
    const res = await axios.get(`${END_POINT}/api${path}`);
    if (res.statusText !== 'OK') throw new Error('네트워크 에러');
    return await res.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const postData = async (path: string, body: Object) => {
  try {
    const res = await axios.post(`${END_POINT}/api${path}`, body);
    if (Math.round(res.status / 200) !== 1) throw new Error('네트워크 에러');
    return await res.status;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteData = async (path: string) => {
  try {
    const res = await axios.delete(`${END_POINT}/api${path}`);
    if (res.statusText !== 'OK') throw new Error('네트워크 에러');
    return await res.data;
  } catch (e) {
    throw new Error(e);
  }
};
