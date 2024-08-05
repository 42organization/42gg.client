import { useRouter } from 'next/router';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import useAnnouncements from 'hooks/agenda/agendaDetail/useAnnouncements';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

const newAnnoucnemet = () => {
  alert('새로운 공지사항을 추가합니다.');
};

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const announcementData = useAnnouncements(agendaKey as string);

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
