import FormBtn from 'components/agenda/button/FormButton';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import styles from 'styles/agenda/Form/Form.module.scss';

interface CreateFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateAnnouncementForm = ({ handleSubmit }: CreateFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
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
      <div className={styles.buttonContainer}>
        <FormBtn
          label='취소하기'
          onClick={(e) => {
            e.preventDefault();
            console.log('취소 버튼 눌림', e);
          }}
        />
        <FormBtn submit={true} label='제출하기' />
      </div>
    </form>
  );
};

export default CreateAnnouncementForm;
