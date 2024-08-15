// import { useRouter } from 'next/router';
import AgendaModalProvider from 'components/agenda/modal/AgendaModalProvider';
import Footer from 'components/takgu/Layout/Footer';
import Header from 'components/takgu/Layout/Header';
import HeaderStateContext from 'components/takgu/Layout/HeaderContext';
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
      <div className={styles.background}>
        <HeaderStateContext>
          <Header />
        </HeaderStateContext>
        {children}
        <Footer />
      </div>
      <AgendaModalProvider />
    </>
  );
}

export default AgendaAppLayout;
