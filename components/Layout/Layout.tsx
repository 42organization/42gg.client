import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, liveState } from '../../utils/recoil/main';
import { UserData, LiveData } from '../../types/mainType';
import Header from './Header';
import Footer from './Footer';
import { getData } from '../../utils/axios';
import { RiPingPongFill } from 'react-icons/ri';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const setLiveData = useSetRecoilState<LiveData>(liveState);
  const userId = userData.userId;
  const presentPath = useRouter().asPath;

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/users`);
        setUserData(data);
        getLiveDataHandler(data.userId);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    getLiveDataHandler(userId);
  }, [presentPath]);

  const getLiveDataHandler = async (userId: string) => {
    if (userId !== '') {
      try {
        const data = await getData(`/pingpong/users/${userId}/live`);
        setLiveData(data);
      } catch (e) {}
    }
  };

  return (
    <>
      <Header />
      {presentPath !== '/match' && (
        <Link href='/match'>
          <a className='matchingButton'>
            <RiPingPongFill />
          </a>
        </Link>
      )}
      {children}
      <Footer />
    </>
  );
}
