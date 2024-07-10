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
      <p>진행기간 : {0}일</p>
      <TimeInput name='recruitEndDate' label='모집마감일' />
      <div>
        <h3>등록 가능 팀 제한</h3>
        <CountInput name='minTeam' label='최소' min={3} max={50} value={3} />
        <CountInput name='maxTeam' label='최대' min={3} max={50} value={3} />
      </div>
      <div>
        <h3>팀당 인원 제한</h3>
        <CheckboxInput name='isSolo' label='개인' />
        <CountInput name='minMember' label='최소' min={1} max={10} value={3} />
        <CountInput name='maxMember' label='최대' min={2} max={10} value={3} />
      </div>
      <ImageInput name='image' label='포스터 파일 첨부하기' />
      <CheckboxInput name='isPublic' label='대회 유무' />
    </form>
  );
};

export default CreateTeamForm;
