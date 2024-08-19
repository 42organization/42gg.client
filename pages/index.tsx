import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import PingpongIcon from 'public/image/takgu/ping-pong.svg';
import styles from 'styles/index.module.scss';

const mockAgendaData = {
  agendaTitle: 'name',
  agendaContents: 'contents',
  agendaDeadLine: '2024-09-01T4:35:07', // format: 2024-09-01T04:35:07
  agendaStartTime: '2024-09-01T4:35:07',
  agendaEndTime: '2024-09-01T4:35:07',
  agendaMinTeam: 3,
  agendaMaxTeam: 10,
  agendaCurrentTeam: 10,
  agendaMinPeople: 10,
  agendaMaxPeople: 10,
  agendaPoster: null,
  agendaHost: 'host',
  agendaLocation: 0,
  agendaStatus: 0,
  createdAt: '2024-09-01T4:35:07',
  announcementTitle: 'sdf',
  isOfficial: true,
  isRanking: true,
  agendaisRanking: true,
  agendaKey: 23,
};

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
      <div className={styles.container}>
        <AgendaInfo agendaInfo={mockAgendaData} key={3} />
        {/* <PageController current={} max={} /> */}
      </div>

      <button className={styles.container}>아우터 매치 준비중입니다.</button>
    </div>
  );
};

export default Index;
