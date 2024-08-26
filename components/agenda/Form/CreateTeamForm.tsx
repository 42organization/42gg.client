import router from 'next/router';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { transformTeamLocation } from 'utils/agenda/transformLocation';
import { AgendaLocation } from 'constants/agenda/agenda';
import FormBtn from 'components/agenda/button/FormButton';
import CheckBoxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface CreateTeamFormProps {
  location: AgendaLocation | null;

  isEdit?: boolean;
  agendaKey: string;
  /** 팀 상세 페이지 - 수정 */
  teamDetail?: TeamDetailProps;
  onProceed?: () => void;
  handleConvert?: () => void;
}

const transformFormData = (formData: FormData) => {
  const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
  data.teamIsPrivate = data.teamIsPrivate === 'on';

  // 팀 위치 변환
  data.teamLocation = transformTeamLocation(data.teamLocation);

  // 트림 처리
  data.teamName = data.teamName.trim();
  data.teamContent = data.teamContent.trim();

  return data;
};

const SubmitTeamForm = (
  target: React.FormEvent<HTMLFormElement>,
  isEdit: boolean,
  sendRequest: any,
  agendaKey: string,
  teamKey?: string,
  onProceed?: () => void
) => {
  target.preventDefault();

  const formData = new FormData(target.currentTarget);
  const data = transformFormData(formData);

  if (data.teamName === '' || data.teamContent === '') {
    alert('모든 항목을 입력해주세요.'); //임시
    return;
  }
  if (isEdit) data.teamKey = teamKey;

  const requestMethod = isEdit ? 'PATCH' : 'POST';

  sendRequest(
    requestMethod,
    'team',
    data,
    { agenda_key: agendaKey },
    (res: any) => {
      if (isEdit) {
        onProceed && onProceed();
      } else {
        router.push(`/agenda/${agendaKey}/${res.teamKey}`);
      }
    },
    (err: string) => {
      console.error(err);
    }
  );
};

const CreateTeamForm = ({
  location,
  isEdit = false,
  agendaKey,
  teamDetail,
  onProceed,
  handleConvert,
}: CreateTeamFormProps) => {
  const sendRequest = useFetchRequest().sendRequest;
  const { teamUID } = router.query;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    SubmitTeamForm(
      e,
      isEdit,
      sendRequest,
      agendaKey,
      teamUID as string,
      onProceed
    );
    if (handleConvert) {
      handleConvert();
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.pageContianer}>
        <TitleInput
          name='teamName'
          label='팀 이름'
          placeholder='팀 이름을 입력해주세요'
          defaultValue={teamDetail && teamDetail.teamName} // 팀 상세 페이지 - 수정
        />
        <CheckBoxInput
          name='teamIsPrivate'
          label='비밀방(초대만 가능, 대회 내역에서 보이지 않음)'
          checked={teamDetail && teamDetail.teamIsPrivate} // 팀 상세 페이지 - 수정
        />
        {location === 'MIX' ? (
          <SelectInput
            name='teamLocation'
            label='클러스터 위치'
            options={['서울', '경산', '둘다']}
          />
        ) : (
          <input type='hidden' name='teamLocation' value={location || ''} />
        )}
        <DescriptionInput
          name='teamContent'
          label='팀 설명'
          placeholder='팀 설명을 입력해주세요'
          defaultValue={teamDetail && teamDetail.teamContent} // 팀 상세 페이지 - 수정
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            handleConvert && handleConvert(); // 팀 상세 페이지 - 수정
          }}
          className={`${styles.formBtn} ${styles.cancel}`}
        >
          취소
        </button>
        <button type='submit' className={`${styles.formBtn} ${styles.submit}`}>
          {teamDetail ? '팀 수정' : '팀 생성'}
        </button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
