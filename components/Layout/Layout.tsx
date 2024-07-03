import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { openCurrentMatchState } from 'utils/recoil/match';
import AdminReject from 'components/admin/AdminReject';
import AdminLayout from 'components/admin/Layout';
import CurrentMatch from 'components/Layout/CurrentMatch';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import HeaderStateContext from 'components/Layout/HeaderContext';
import MainPageProfile from 'components/Layout/MainPageProfile';
import Megaphone from 'components/Layout/MegaPhone';
import RecruitLayout from 'components/recruit/RecruitLayout';
import Statistics from 'pages/takgu/statistics';
import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/Layout/Layout.module.scss';
import PlayButton from './PlayButton';
import UserLayout from './UserLayout';

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

  if (presentPath.includes('/admin')) {
    if (!user.isAdmin) return <AdminReject />;
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (presentPath.includes('/recruit')) {
    return <RecruitLayout>{children}</RecruitLayout>;
  }

  // NOTE : 외부 툴을 사용해보고 외부 툴로 대체가 가능하다면 삭제 예정
  if (presentPath === '/statistics' && user.isAdmin)
    return (
      <UserLayout>
        <Statistics />
      </UserLayout>
    );
  if (presentPath.includes('/takgu'))
    return (
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
    );
  return <>{children}</>;
}
