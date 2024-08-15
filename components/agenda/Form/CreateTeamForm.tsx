import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { AgendaLocation } from 'constants/agenda/agenda';
import styles from 'styles/agenda/Form/Form.module.scss';
import CheckBoxInput from '../Input/CheckboxInput';
import DescriptionInput from '../Input/DescriptionInput';
import SelectInput from '../Input/SelectInput';
import TitleInput from '../Input/TitleInput';

interface CreateTeamFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef?: React.RefObject<HTMLFormElement>;
  teamDetail?: TeamDetailProps;
}

const CreateTeamForm = ({
  handleSubmit,
  formRef,
  teamDetail,
}: CreateTeamFormProps) => {
  const location =
    teamDetail?.teamLocation == AgendaLocation.SEOUL
      ? '서울'
      : teamDetail?.teamLocation == AgendaLocation.GYEONGSAN
      ? '경산'
      : '서울, 경산';

  return (
    <form onSubmit={handleSubmit} className={styles.container} ref={formRef}>
      <TitleInput
        name='teamName'
        label='팀 이름'
        defaultValue={teamDetail && teamDetail.teamName}
        placeholder='팀 이름을 입력해주세요'
      />

      <CheckBoxInput
        name='isPublic'
        label='공개 여부'
        checked={teamDetail && teamDetail.teamIsPrivate}
      />

      <SelectInput
        name='teamLocation'
        label='클러스터 위치'
        selected={teamDetail && location}
        options={['서울', '경산', '서울, 경산']}
      />

      <DescriptionInput
        name='teamDescription'
        label='팀 설명'
        placeholder='팀 설명을 입력해주세요'
        defaultValue={teamDetail && teamDetail.teamContent}
      />
    </form>
  );
};

export default CreateTeamForm;
