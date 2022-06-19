import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState, liveState } from '../../utils/recoil/main';
import { UserData, LiveData } from '../../types/mainType';
import InputScoreModal from '../score/InputScoreModal';
import CurrentMatchInfo from '../match/CurrentMatchInfo';
import Header from './Header';
import Footer from './Footer';
import { getData } from '../../utils/axios';
import { RiPingPongFill } from 'react-icons/ri';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [liveData, setLiveData] = useRecoilState<LiveData>(liveState);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(`/pingpong/users`);
        setUserData(res?.data);
        getLiveDataHandler(res?.data.userId);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    getLiveDataHandler(userData.userId);
  }, [presentPath]);

  const getLiveDataHandler = async (userId: string) => {
    if (userId !== '') {
      try {
        const res = await getData(`/pingpong/users/${userId}/live`);
        setLiveData(res?.data);
      } catch (e) {}
    }
  };

  return (
    <>
      <Header />
      {/* 목업 서버에 항상 gameId를 갖고 있어 서버 연결 후 주석 해제 예정 */}
      {/* {liveData.gameId && <InputScoreModal gameId={liveData.gameId} />} */}
      {liveData.event === 'match' && <CurrentMatchInfo />}
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
