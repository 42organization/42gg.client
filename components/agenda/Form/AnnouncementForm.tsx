import router from 'next/router';
import FormBtn from 'components/agenda/button/FormButton';
import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface CreateFormProps {
  isAdmin?: boolean;
  isEdit?: boolean;
  data?: any;
  stringKey: string;
  onProceed?: () => void;
}

const SubmitAnnouncementForm = async (
  e: React.FormEvent<HTMLFormElement>,
  sendRequest: any,
  agendaKey: string,
  isAdmin?: boolean,
  handleProceed?: () => void
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const announcementTitle = formData.get('announcementTitle');
  const announcementDescription = formData.get('announcementDescription');
  isAdmin &&
    formData.set('isShow', formData.get('isShow') === 'on' ? 'true' : 'false');

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
      handleProceed && handleProceed();
    },
    (error: string) => {
      console.error(error);
    }
  );
};

const AnnouncementForm = ({
  isAdmin = false,
  isEdit = false,
  data,
  stringKey,
  onProceed,
}: CreateFormProps) => {
  const { closeModal } = useModal();

  const { sendRequest } = useFetchRequest();

  const handleSuccess = () => {
    if (onProceed) {
      onProceed();
    } else {
      closeModal();
    }
  };

  const oncancel = () => {
    if (isAdmin) {
      closeModal();
    } else {
      window.history.back();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        SubmitAnnouncementForm(
          e,
          sendRequest,
          stringKey,
          isAdmin,
          handleSuccess
        );
      }}
      className={styles.container}
    >
      <TitleInput
        name='announcementTitle'
        label='공지사항 제목'
        placeholder='공지사항 제목을 입력해주세요'
      />
      <DescriptionInput
        name='announcementDescription'
        label='공지사항 내용'
        placeholder='공지사항 내용을 입력해주세요'
      />

      {isAdmin && <CheckboxInput name='isShow' label='표시 여부' />}

      <div className={styles.buttonContainer}>
        <FormBtn
          label='취소하기'
          onClick={(e) => {
            e.preventDefault();
            oncancel();
          }}
        />
        <FormBtn submit={true} label='제출하기' />
      </div>
    </form>
  );
};

export default AnnouncementForm;
