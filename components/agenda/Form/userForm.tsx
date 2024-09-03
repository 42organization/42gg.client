import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface userFormProps {
  stringKey: string;
}
interface dataType {
  userIntraId: string;
  userContent: string;
  userGithub: string;
  userLocation: string;
}

const SubmitUserForm = async (
  e: React.FormEvent<HTMLFormElement>,
  sendRequest: any,
  data: any,
  handleProceed?: () => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const jsonData: any = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  sendRequest(
    'PATCH',
    'admin/profile',
    jsonData,
    { intraId: data.userIntraId },
    () => {
      handleProceed && handleProceed();
    },
    (error: string) => {
      console.error(error);
    }
  );
};

const UserForm = ({ stringKey }: userFormProps) => {
  const { closeModal } = useModal();
  const sendRequest = useFetchRequest().sendRequest;

  const { data }: { data: dataType | null } = useFetchGet(
    `profile/${stringKey}`
  );

  if (!data) {
    return <div className={styles.modalContainer}>loading...</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        SubmitUserForm(e, sendRequest, data, closeModal);
      }}
      className={styles.container}
    >
      <div className={styles.modalContainer}>
        <div className={styles.label_title}>IntraId : {data.userIntraId}</div>

        <TitleInput
          name='userContent'
          label='상태 메시지'
          placeholder='상태 메시지를 입력해주세요'
          defaultValue={data.userContent}
        />
        <DescriptionInput
          name='userGithub'
          label='Github 주소'
          placeholder='Github 주소를 입력해주세요'
          defaultValue={data.userGithub}
        />
        <SelectInput
          name='userLocation'
          label='유저 위치'
          options={['SEOUL', 'GYEONGSAN']}
          selected={data.userLocation}
        />
      </div>

      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
          className={`${styles.formBtn} ${styles.cancel}`}
        >
          취소
        </button>
        <button type='submit' className={`${styles.formBtn} ${styles.submit}`}>
          수정
        </button>
      </div>
    </form>
  );
};

export default UserForm;
