import { useEffect, useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

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

const newAnnoucnemet = () => {
  alert('새로운 공지사항을 추가합니다.');
};

export default function AgendaAnnouncements() {
  // { isHost }: { isHost: boolean }) {
  const isHost = true;
  const [announcementData, setannouncementData] = useState<
    AnnouncementProps[] | null
  >(null);

  useEffect(() => {
    setannouncementData(mockData);
  }, []);

  if (!announcementData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.announcementsList}>
        {announcementData.map((item) => (
          <AnnouncementItem
            key={item.id}
            id={item.id}
            title={item.title}
            contents={item.contents}
            createdAt={item.createdAt}
          />
        ))}

        {isHost ? (
          <div className={styles.buttonWarp}>
            <UploadBtn text='공지사항 추가' onClick={newAnnoucnemet} />
          </div>
        ) : null}
      </div>
    </>
  );
}
