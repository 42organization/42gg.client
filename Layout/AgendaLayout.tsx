import { instanceInAgenda } from 'utils/axios';
import AgendaHeader from 'components/agenda/Layout/AgendaHeader';
import AgendaModalProvider from 'components/agenda/modal/AgendaModalProvider';
import Footer from 'components/takgu/Layout/Footer';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useAxiosWithToast from 'hooks/useAxiosWithToast';
import styles from 'styles/agenda/Layout/Layout.module.scss';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  useAxiosWithToast(instanceInAgenda); // API의 성공 실패 스낵바로 알리는 기능

  const user = useUser();

  if (!user || !user.intraId) return null;

  return (
    <>
      <AgendaHeader />
      <div className={styles.background}></div>
      <div className={styles.container}>
        {children}
        <Footer />
        <AgendaModalProvider />
      </div>
    </>
  );
}

export default AgendaAppLayout;
