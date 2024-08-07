import { useRouter } from 'next/router';
import { instanceInAgenda } from 'utils/axios';
import CreateAnnouncementForm from 'components/agenda/Form/CreateAnnouncementForm';
import styles from 'styles/agenda/agendaDetail/tabs/createAnnouncement.module.scss';

const CreateAnnouncement = () => {
  const router = useRouter();
  const { agendaKey } = router.query;

  const submitForm = (target: React.FormEvent<HTMLFormElement>) => {
    target.preventDefault();

    const formData = new FormData(target.currentTarget);
    const announcementTitle = formData.get('announcementTitle');
    const announcementDescription = formData.get('announcementDescription');

    instanceInAgenda
      .post(`announcement?agenda_key=${agendaKey}`, {
        title: announcementTitle,
        content: announcementDescription,
      })
      .then((response) => {
        console.log(response.data);
        router.push(`/agenda/${agendaKey}`);

        // 400 : title, content가 없을 때 모달창 띄우기
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공지사항</h2>
      <CreateAnnouncementForm handleSubmit={submitForm} />
    </div>
  );
};

export default CreateAnnouncement;
