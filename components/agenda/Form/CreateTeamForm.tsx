import router from 'next/router';
import { agendaModal } from 'types/agenda/modalTypes';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { transformTeamLocation } from 'utils/agenda/transformLocation';
import { instanceInAgenda } from 'utils/axios';
import { AgendaLocation } from 'constants/agenda/agenda';
import FormBtn from 'components/agenda/button/FormButton';
import CheckBoxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';
import { useModal } from '../modal/useModal';

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
const teamdataToMsg = (data: { [key: string]: string }) => {
  const msgdata: { [key: string]: string } = {};
  let msg = '';
  msgdata['팀 이름'] = data.teamName;
  msgdata['팀 설명'] = data.teamContent;
  msgdata['팀 위치'] = data.teamLocation;
  Object.keys(msgdata).forEach((key) => {
    msg += `${key}: ${msgdata[key]}\n`;
  });
  msg += data.teamIsPrivate ? '비밀방\n' : '공개방\n';
  return msg;
};

const SubmitTeamForm = (
  target: React.FormEvent<HTMLFormElement>,
  isEdit: boolean,
  sendRequest: any,
  agendaKey: string,
  openModal: (props: agendaModal) => void,
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

  // 모달 내용체크
  let msg = teamdataToMsg(data);
  msg += isEdit ? '\n팀 정보를 수정하시겠습니까?' : '\n팀을 생성하시겠습니까?';
  openModal({
    type: 'proceedCheck',
    title: isEdit ? '팀 수정' : '팀 생성',
    description: msg,
    onProceed: () => {
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
    },
  });
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
  const { openModal } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    SubmitTeamForm(
      e,
      isEdit,
      sendRequest,
      agendaKey,
      openModal,
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
