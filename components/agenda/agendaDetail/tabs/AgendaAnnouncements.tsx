import { useRouter } from 'next/router';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import AnnouncementItem from 'components/agenda/agendaDetail/tabs/AnnouncementItem';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import PageNation from 'components/Pagination';
// import useFetchGet from 'hooks/agenda/useFetchGet';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaAnnouncements.module.scss';

export default function AgendaAnnouncements({ isHost }: { isHost: boolean }) {
  const router = useRouter();
  const { agendaKey } = router.query;

  // !! page, size 변수로 변경
  // const params = { agenda_key: agendaKey, page: 1, size: 20 };
  // const content: AnnouncementProps[] | null = useFetchGet<
  //   AnnouncementProps[]
  // >(`/announcement`, params).data;

  const { content, PagaNationElementProps } = usePageNation<AnnouncementProps>({
    url: `/announcement`,
    params: { agenda_key: agendaKey },
  });

  if (!content) {
    return <div>Loading...</div>;
  }
  const newAnnouncement = () => {
    router.push(`/agenda/${agendaKey}/host/createAnnouncement`);
  };

  return (
    <>
      <div className={styles.announcementsList}>
        {content &&
          content.map((item) => (
            <AnnouncementItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
            />
          ))}
        <PageNation {...PagaNationElementProps} />

        {isHost ? (
          <div className={styles.buttonWarp}>
            <UploadBtn text='공지사항 추가' onClick={newAnnouncement} />
          </div>
        ) : null}
      </div>
    </>
  );
}
