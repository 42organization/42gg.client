import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import PageController from 'components/agenda/utils/PageController';
import PingpongIcon from 'public/image/takgu/ping-pong.svg';
import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/index.module.scss';

const Index: NextPage = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.layout}>
      <h2 className={styles.title} onClick={() => handleNavigation('/agenda')}>
        Agenda
      </h2>
      <PageController handleNavigation={handleNavigation} />
      <h2 className={styles.title}>Ticket & PingPong</h2>
      <div className={styles.flex + ' ' + styles.content}>
        <button
          className={styles.container}
          onClick={() => handleNavigation('/agenda/ticket')}
        >
          <Image
            src='/image/ticket.png'
            alt='ticket'
            width={0}
            height={0}
            style={{ width: '100%', height: '100%' }}
          />
        </button>
        <button
          className={styles.container}
          onClick={() => handleNavigation('/takgu')}
        >
          <PingpongIcon width='100%' height='100%' />
        </button>
      </div>

      <button className={styles.container + ' ' + styles.match}>
        아우터 매치 준비중입니다.
      </button>
    </div>
  );
};

export default Index;
