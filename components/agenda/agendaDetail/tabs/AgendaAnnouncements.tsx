import { useRouter } from 'next/router';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import useFetchDataGet from 'hooks/agenda/useFetchDataGet';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const router = useRouter();
  const { agendaKey } = router.query;

  // !! page, size 변수로 변경
  const announcementData = useFetchDataGet<AnnouncementProps[]>(
    `/announcement?agenda_key=${agendaKey}&page=1&size=20`,
    agendaKey as string
  ).data;

  if (!announcementData) {
    return <div>Loading...</div>;
  }

  const newAnnouncement = () => {
    router.push(`/agenda/${agendaKey}/host/createAnnouncement`);
  };

  return (
    <>
      <div className={styles.announcementsList}>
        {announcementData.map((item) => (
          <AnnouncementItem
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
          />
        ))}

        {isHost ? (
          <div className={styles.buttonWarp}>
            <UploadBtn text='공지사항 추가' onClick={newAnnouncement} />
          </div>
        ) : null}
      </div>
    </>
  );
}
