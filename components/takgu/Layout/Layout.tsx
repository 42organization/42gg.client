import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { openCurrentMatchState } from 'utils/takgu/recoil/match';
import AdminReject from 'components/takgu/admin/AdminReject';
import AdminLayout from 'components/takgu/admin/Layout';
import CurrentMatch from 'components/takgu/Layout/CurrentMatch';
import Footer from 'components/takgu/Layout/Footer';
import Header from 'components/takgu/Layout/Header';
import HeaderStateContext from 'components/takgu/Layout/HeaderContext';
import MainPageProfile from 'components/takgu/Layout/MainPageProfile';
import Megaphone from 'components/takgu/Layout/MegaPhone';
import RecruitLayout from 'components/takgu/recruit/RecruitLayout';
import Statistics from 'pages/takgu/statistics';
import useAnnouncementCheck from 'hooks/takgu/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/takgu/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/takgu/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/takgu/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/takgu/Layout/Layout.module.scss';
import PlayButton from './PlayButton';
import UserLayout from './UserLayout';
import ModalProvider from '../modal/ModalProvider';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useUser();
  const presentPath = useRouter().asPath;
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  useAxiosResponse();
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

  if (!user || !user.intraId) return null;

  if (presentPath.includes('/takgu/admin')) {
    if (!user.isAdmin) return <AdminReject />;
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (presentPath.includes('/takgu/recruit')) {
    return <RecruitLayout>{children}</RecruitLayout>;
  }

  // NOTE : 외부 툴을 사용해보고 외부 툴로 대체가 가능하다면 삭제 예정
  if (presentPath === '/takgu/statistics' && user.isAdmin)
    return (
      <UserLayout>
        <Statistics />
      </UserLayout>
    );

  if (presentPath.includes('/takgu'))
    return (
      <>
        <UserLayout>
          <HeaderStateContext>
            <Header />
          </HeaderStateContext>
          <PlayButton />
          <div className={styles.topInfo}>
            <Megaphone />
            {openCurrentMatch && <CurrentMatch />}
            {presentPath === '/' && <MainPageProfile />}
          </div>
          {children}
          <Footer />
        </UserLayout>
        <ModalProvider />
      </>
    );

  return <>{children}</>;
}
