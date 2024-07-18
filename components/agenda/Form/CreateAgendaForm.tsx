import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import CountInput from 'components/agenda/Input/CountInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import ImageInput from 'components/agenda/Input/ImageInput';
import TimeInput from 'components/agenda/Input/TimeInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import styles from 'styles/agenda/Form/Form.module.scss';
import SubmitInputBtn from '../button/SubmitInputButton';

interface CreateAgendaFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateAgendaForm = ({ handleSubmit }: CreateAgendaFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TitleInput name='title' label='제목' placeholder='제목을 입력해주세요' />
      <DescriptionInput
        name='description'
        label='설명'
        placeholder='설명을 입력해주세요'
      />
      <div className={styles.dateContainer}>
        <TimeInput name='startDate' label='시작일' />
        <TimeInput name='endDate' label='종료일' />
        <p>진행기간 : {0}일</p>
      </div>
      <div className={styles.dateContainer}>
        <TimeInput name='recruitEndDate' label='모집마감일' />
        <p>D-{20}일</p>
      </div>

      <h3 className={styles.container_label}>등록 가능 팀 제한</h3>
      <div className={styles.countContainer}>
        <CountInput name='minTeam' label='최소 팀' min={3} max={50} />
        <CountInput name='maxTeam' label='최대 팀' min={3} max={50} />
      </div>
      <h3 className={styles.container_label}>팀당 인원 제한</h3>
      <CheckboxInput name='isSolo' label='개인' />
      <div className={styles.countContainer}>
        <CountInput name='minMember' label='최소' min={1} max={10} />
        <CountInput name='maxMember' label='최대' min={2} max={10} />
      </div>
      <ImageInput name='image' label='포스터 파일 첨부하기' />
      <CheckboxInput name='isPublic' label='대회 유무' />
      <div className={styles.buttonContainer}>
        <SubmitInputBtn name='cancel' label='취소하기' /> {/*새로만들어야 함*/}
        <SubmitInputBtn name='submit' label='팀 만들기' />
      </div>
    </form>
  );
};

export default CreateAgendaForm;
