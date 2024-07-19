import { useEffect, useState } from 'react';
import NotificationItem from 'components/agenda/agendaDetail/taps/NotificationItem';
import styles from 'styles/agenda/agendaDetail/taps/AgendaNotifications.module.scss';

const mockData = [
  {
    id: 1,
    title: '첫 번째 공지사항',
    contents: '공지사항 이렇게 변경합니다 알아서 보세요.',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: '두 번째 공지사항',
    contents: '공지사항 이렇게 변경합니다 알아서 보세요.',
    createdAt: new Date(),
  },
];

type Notification = {
  id: number;
  title: string;
  contents: string;
  createdAt: Date;
};

export default function AgendaNotifications() {
  const [notiData, setNotiData] = useState<Notification[] | null>(null);

  useEffect(() => {
    setNotiData(mockData);
  }, []);

  if (!notiData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.notificationsList}>
        {notiData.map((item) => (
          <NotificationItem
            key={item.id}
            title={item.title}
            contents={item.contents}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
}
