import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import PageController from 'components/agenda/utils/PageController';
import RightArrow from 'public/image/agenda/ChevronRight.svg';
import CalendarIcon from 'public/image/calendar/42Calendar.png';
import PingpongIcon from 'public/image/takgu/ping-pong.svg';
import styles from 'styles/index.module.scss';

const Index: NextPage = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <div className={styles.titleWarp}>
          <h2
            className={styles.title}
            onClick={() => handleNavigation('/agenda')}
          >
            Agenda
          </h2>
          <RightArrow
            className={styles.arrowIcon}
            onClick={() => handleNavigation('/agenda')}
          />
        </div>
        <PageController handleNavigation={handleNavigation} />
      </div>
      <div className={styles.flex}>
        <div className={styles.ticket}>
          <h2
            className={styles.title}
            onClick={() => handleNavigation('/agenda/ticket')}
          >
            Ticket
          </h2>
          <button
            className={styles.container}
            onClick={() => handleNavigation('/agenda/ticket')}
          >
            <div className={styles.imageWrapper}>
              <Image
                src='/image/ticket.png'
                alt='ticket'
                width={0}
                height={0}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </button>
        </div>
        <div className={styles.pingpong}>
          <h2
            className={styles.title}
            onClick={() => handleNavigation('/takgu')}
          >
            PingPong
          </h2>
          <button
            className={styles.container}
            onClick={() => handleNavigation('/takgu')}
          >
            <div className={styles.imageWrapper}>
              <PingpongIcon width='100%' height='100%' />
            </div>
          </button>
        </div>
      </div>

      <div className={styles.match}>
        <h2
          className={styles.title}
          onClick={() => handleNavigation('/calendar')}
        >
          Calendar
        </h2>
        <button
          className={styles.container}
          onClick={() => handleNavigation('/calendar')}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={CalendarIcon}
              alt='calendar'
              width={0}
              height={0}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Index;
