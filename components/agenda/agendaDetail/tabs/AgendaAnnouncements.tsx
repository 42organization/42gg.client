import { useRouter } from 'next/router';
import { useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const { content, PagaNationElementProps } = usePageNation<AnnouncementProps>({
    url: `/announcement`,
    params: { agenda_key: agendaKey },
    size: 5,
  });

  const newAnnouncement = () => {
    router.push(`/agenda/${agendaKey}/host/createAnnouncement`);
  };

  const [selected, setSelected] = useState<number>(0);

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
            {isHost ? (
              <div className={styles.buttonWarp}>
                <UploadBtn text='공지사항 추가' onClick={newAnnouncement} />
              </div>
            ) : null}
          </div>
          {content.length > 0 && selected >= 0 && selected < content.length ? (
            <AnnouncementItem
              key={content[selected].id}
              id={content[selected].id}
              title={content[selected].title}
              content={content[selected].content}
              createdAt={content[selected].createdAt}
              isSelected={true}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <div className={styles.emptyContainer}>공지사항이 없습니다.</div>
      )}

      {/* </div>/ */}
    </>
  );
}
