import { useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import PageNation from 'components/Pagination';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements() {
  const agendaKey = useAgendaKey();
  const [selected, setSelected] = useState<number>(0);

  const { content, PagaNationElementProps } = usePageNation<AnnouncementProps>({
    url: `/announcement`,
    params: { agenda_key: agendaKey },
    size: 5,
    isReady: Boolean(agendaKey),
  });

  if (!agendaKey || !content) {
    return <AgendaLoading />;
  }

  return (
    <>
      {content && content.length > 0 ? (
        <>
          <div className={styles.announcementsList}>
            {content.map((item, idx) => (
              <AnnouncementItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                createdAt={item.createdAt}
                isListSelected={selected === idx}
                setSelected={() => setSelected(idx)}
              />
            ))}
            <PageNation {...PagaNationElementProps} />
          </div>
          <AnnouncementItem
            key={content[selected].id}
            id={content[selected].id}
            title={content[selected].title}
            content={content[selected].content}
            createdAt={content[selected].createdAt}
            isSelected={true}
          />
        </>
      ) : (
        <div className={styles.emptyContainer}>공지사항이 없습니다.</div>
      )}
    </>
  );
}
