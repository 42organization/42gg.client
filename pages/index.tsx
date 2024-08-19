import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import PageController from 'components/agenda/utils/PageController';
import PingpongIcon from 'public/image/takgu/ping-pong.svg';
import styles from 'styles/index.module.scss';

const Index: NextPage = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
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
      <PageController handleNavigation={handleNavigation} />

      <button className={styles.container}>아우터 매치 준비중입니다.</button>
    </div>
  );
};

export default Index;
