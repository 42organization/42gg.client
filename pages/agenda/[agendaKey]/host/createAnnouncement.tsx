import { useRouter } from 'next/router';
import { instanceInAgenda } from 'utils/axios';
import CreateAnnouncementForm from 'components/agenda/Form/CreateAnnouncementForm';
import useFetchPost from 'hooks/agenda/useFetchPost';
import styles from 'styles/agenda/agendaDetail/tabs/createAnnouncement.module.scss';

const CreateAnnouncement = () => {
  const router = useRouter();
  const { agendaKey } = router.query;

  const { data, status, error, postData } = useFetchPost();

  const submitForm = (target: React.FormEvent<HTMLFormElement>) => {
    target.preventDefault();

    const formData = new FormData(target.currentTarget);
    const announcementTitle = formData.get('announcementTitle');
    const announcementDescription = formData.get('announcementDescription');

    postData(
      `announcement`,
      {
        title: announcementTitle,
        content: announcementDescription,
      },
      { agenda_key: agendaKey },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (data) => {
        router.push(`/agenda/${agendaKey}`);
      },
      (error: string) => {
        console.error(error);
      }
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공지사항</h2>
      <CreateAnnouncementForm handleSubmit={submitForm} />
    </div>
  );
};

export default CreateAnnouncement;
