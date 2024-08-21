import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface CreateFormProps {
  isAdmin?: boolean;
  data?: any;
  stringKey: string;
  onProceed?: () => void;
}

const SubmitAnnouncementForm = async (
  e: React.FormEvent<HTMLFormElement>,
  sendRequest: any,
  agendaKey: string,
  isAdmin?: boolean,
  data?: any,
  handleProceed?: () => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const jsonData: any = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  if (isAdmin) {
    jsonData.isShow = jsonData.isShow === 'on' ? true : false;
    jsonData.id = data.id;
  }

  const request = isAdmin ? 'PATCH' : 'POST';
  const url = isAdmin ? `admin/announcement` : 'announcement';
  const params = isAdmin ? {} : { agenda_key: agendaKey };

  sendRequest(
    request,
    url,
    jsonData,
    params,
    (res) => {
      handleProceed && handleProceed();
    },
    (error: string) => {
      console.error(error);
    }
  );
};

const AnnouncementForm = ({
  isAdmin = false,
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
          data,
          handleSuccess
        );
      }}
      className={styles.container}
    >
      <div className={styles.modalContainer}>
        <TitleInput
          name='title'
          label='공지사항 제목'
          placeholder='공지사항 제목을 입력해주세요'
          defaultValue={isAdmin ? data.title : ''}
        />
        <DescriptionInput
          name='content'
          label='공지사항 내용'
          placeholder='공지사항 내용을 입력해주세요'
          defaultValue={isAdmin ? data.content : ''}
        />

        {isAdmin && (
          <CheckboxInput
            name='isShow'
            label='표시 여부'
            checked={data ? data.isShow : false}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            oncancel();
          }}
          className={`${styles.formBtn} ${styles.cancel}`}
        >
          취소
        </button>
        <button type='submit' className={`${styles.formBtn} ${styles.submit}`}>
          {isAdmin ? '수정' : '등록'}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
