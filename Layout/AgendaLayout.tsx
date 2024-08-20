// import { useRouter } from 'next/router';
import AgendaHeader from 'components/agenda/Layout/AgendaHeader';
import AgendaModalProvider from 'components/agenda/modal/AgendaModalProvider';
import Footer from 'components/takgu/Layout/Footer';
import Agenda from 'pages/agenda';
import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/agenda/Layout/Layout.module.scss';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  const user = useUser();

  if (!user || !user.intraId) return null;

  return (
    <>
      <AgendaHeader />
      <div className={styles.background}></div>
      <div className={styles.container}>
        {children}
        <Footer />
      </div>
      <AgendaModalProvider />
    </>
  );
}

export default AgendaAppLayout;
