import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import CountInput from 'components/agenda/Input/CountInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import ImageInput from 'components/agenda/Input/ImageInput';
import TimeInput from 'components/agenda/Input/TimeInput';
import TitleInput from 'components/agenda/Input/TitleInput';
const CreateTeamForm = () => {
  return (
    <form>
      <TitleInput name='title' label='제목' placeholder='제목을 입력해주세요' />
      <DescriptionInput
        name='description'
        label='설명'
        placeholder='설명을 입력해주세요'
      />
      <TimeInput name='startDate' label='시작일' />
      <TimeInput name='endDate' label='종료일' />
      <CountInput
        name='maxMember'
        label='최대 인원'
        min={1}
        max={10}
        value={1}
        step={1}
      />
      <ImageInput name='image' label='팀 이미지' />
      <CheckboxInput name='isPublic' label='공개 여부' />
    </form>
  );
};

export default CreateTeamForm;
