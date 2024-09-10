import { useRouter } from 'next/router';
import AnnouncementForm from 'components/agenda/Form/AnnouncementForm';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import styles from 'styles/agenda/agendaDetail/tabs/createAnnouncement.module.scss';

const CreateAnnouncement = () => {
  const router = useRouter();
  const agendaKey = useAgendaKey();

  if (!agendaKey) {
    return <AgendaLoading />;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공지사항</h2>
      <AnnouncementForm
        stringKey={agendaKey as string}
        onProceed={() => {
          router.push(`/agenda/detail?agenda_key=${agendaKey}`);
        }}
      />
    </div>
  );
};

export default CreateAnnouncement;
