import { NextRouter, useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/modal';

type useLogoutCheckReturn = [() => void, () => Promise<void>];

const useLogoutCheck = (): useLogoutCheckReturn => {
  const setLoggedIn = useSetRecoilState<boolean>(loginState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const router: NextRouter = useRouter();

  const onReturn = () => {
    setModal({ modalName: null });
  };

  const onLogout = async () => {
    await instance.post('/pingpong/users/logout');
    localStorage.removeItem('42gg-token');
    setLoggedIn(false);
    router.push('/');
  };

  return [onReturn, onLogout];
};

export default useLogoutCheck;
