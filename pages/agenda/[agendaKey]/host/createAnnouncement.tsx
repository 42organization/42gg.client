import { useRouter } from 'next/router';
import CreateAnnouncementForm from 'components/agenda/Form/CreateAnnouncementForm';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/agendaDetail/tabs/createAnnouncement.module.scss';

const CreateAnnouncement = () => {
  const router = useRouter();
  const { agendaKey } = router.query;

  const { data, status, error, sendRequest } = useFetchRequest();

  const submitForm = (target: React.FormEvent<HTMLFormElement>) => {
    target.preventDefault();

    const formData = new FormData(target.currentTarget);
    const announcementTitle = formData.get('announcementTitle');
    const announcementDescription = formData.get('announcementDescription');

    sendRequest(
      'POST',
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
function sendRequest(
  arg0: string,
  arg1: string,
  arg2: {
    title: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
  },
  arg3: { agenda_key: string | string[] | undefined },
  arg4: (data: any) => void,
  arg5: (error: string) => void
) {
  throw new Error('Function not implemented.');
}
