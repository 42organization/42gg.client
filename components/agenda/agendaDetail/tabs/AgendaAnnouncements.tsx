import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import PageNation from 'components/Pagination';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const agendaKey = useAgendaKey();

  const { content, PagaNationElementProps } = usePageNation<AnnouncementProps>({
    url: `/announcement`,
    params: { agenda_key: agendaKey },
  });

  if (!agendaKey || !content) {
    return <AgendaLoading />;
  }
  return (
    <>
      <div className={styles.announcementsList}>
        {content && content.length > 0 ? (
          <>
            {content.map((item) => (
              <AnnouncementItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                createdAt={item.createdAt}
              />
            ))}
            <PageNation {...PagaNationElementProps} />
          </>
        ) : (
          <div className={styles.container}>공지사항이 없습니다.</div>
        )}
      </div>
    </>
  );
}
