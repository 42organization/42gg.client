import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/modal';

const useLogoutCheck = () => {
  const setLoggedIn = useSetRecoilState(loginState);
  const setModal = useSetRecoilState(modalState);
  const router = useRouter();

  const onReturn = () => {
    setModal({ modalName: null });
  };

  const onLogout = () => {
    localStorage.removeItem('42gg-token');
    setLoggedIn(false);
    router.push('/');
  };

  return [onReturn, onLogout];
};

export default useLogoutCheck;
