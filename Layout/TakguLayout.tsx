import { useRecoilValue } from 'recoil';
import { openCurrentMatchState } from 'utils/recoil/takgu/match';
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
import { usePathname } from 'hooks/agenda/Layout/usePathname';
import useAnnouncementCheck from 'hooks/takgu/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/takgu/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/takgu/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/takgu/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/takgu/Layout/Layout.module.scss';
import PlayButton from '../components/takgu/Layout/PlayButton';
import UserLayout from '../components/takgu/Layout/UserLayout';
import ModalProvider from '../components/takgu/modal/ModalProvider';
import CustomizedSnackbars from '../components/takgu/toastmsg/toastmsg';

type TakguLayoutProps = {
  children: React.ReactNode;
};

function TakguLayout({ children }: TakguLayoutProps) {
  const user = useUser();
  const presentPath = usePathname();
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  useAxiosResponse();
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

  if (!user || !user.intraId) return null;

  switch (true) {
    case presentPath.includes('takgu/admin'):
      if (!user.isAdmin) return <AdminReject />;
      return <AdminLayout>{children}</AdminLayout>;

    case presentPath.includes('takgu/recruit'):
      return <RecruitLayout>{children}</RecruitLayout>;

    case presentPath === 'takgu/statistics' && user.isAdmin:
      return (
        <UserLayout>
          <Statistics />
        </UserLayout>
      );

    case presentPath.includes('takgu'):
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
        </>
      );
    default:
      return <>{children}</>;
  }
}

{
  /* UserLayout : 배경색 제공 */
  /* LoginChecker : 미로그인시 에러 던짐 */
  /* ErrorChecker : 에러 리코일 체크해서 에러 페이지로 던짐 */
}
const TakguAppLayout = ({ children }: TakguLayoutProps) => {
  return (
    <UserLayout>
      <TakguLayout>{children}</TakguLayout>
      <ModalProvider />
      <CustomizedSnackbars />
    </UserLayout>
  );
};

export default TakguAppLayout;
