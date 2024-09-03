import { useRouter } from 'next/router';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const router = useRouter();
  const agendaKey = router.query.agenda_key;

  const { content, PagaNationElementProps } = usePageNation<AnnouncementProps>({
    url: `/announcement`,
    params: { agenda_key: agendaKey },
  });

  return (
    <>
      <div className={styles.announcementsList}>
        {content && content.length > 0 ? (
          content.map((item) => (
            <AnnouncementItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <div className={styles.container}>공지사항이 없습니다.</div>
        )}
        <PageNation {...PagaNationElementProps} />
      </div>
    </>
  );
}
