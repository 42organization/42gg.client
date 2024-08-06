import styles from 'styles/agenda/Form/Form.module.scss';
import CheckBoxInput from '../Input/CheckboxInput';
import DescriptionInput from '../Input/DescriptionInput';
import SelectInput from '../Input/SelectInput';
import TitleInput from '../Input/TitleInput';

interface CreateTeamFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateTeamForm = ({ handleSubmit }: CreateTeamFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TitleInput
        name='teamName'
        label='팀 이름'
        placeholder='팀 이름을 입력해주세요'
      />
      <CheckBoxInput
        name='teamIsPrivate'
        label='비밀방(초대만 가능, 대회 내역에서 보이지 않음)'
      />
      <SelectInput
        name='teamLocation'
        label='클러스터 위치'
        options={['서울', '경산', '둘다']}
      />
      <DescriptionInput
        name='teamContent'
        label='팀 설명'
        placeholder='팀 설명을 입력해주세요'
      />
      <button type='submit' className={styles.submitButton}>
        팀 만들기
      </button>
    </form>
  );
};

export default CreateTeamForm;
