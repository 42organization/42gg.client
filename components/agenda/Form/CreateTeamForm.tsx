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
      <CheckBoxInput name='isPublic' label='공개 여부' />
      <SelectInput
        name='teamLocation'
        label='클러스터 위치'
        options={['개인', '팀']}
      />
      <DescriptionInput
        name='teamDescription'
        label='팀 설명'
        placeholder='팀 설명을 입력해주세요'
      />
    </form>
  );
};

export default CreateTeamForm;
