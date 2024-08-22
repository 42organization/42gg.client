import router from 'next/router';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { transformTeamLocation } from 'utils/agenda/transformLocation';
import CheckBoxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface AdminTeamFormProps {
  teamKey: string;
  teamData: TeamDetailProps;
}

const AdminTeamFrom = ({ teamKey, teamData }: AdminTeamFormProps) => {
  const sendRequest = useFetchRequest().sendRequest;

  const transformFormData = (formData: FormData) => {
    const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));

    data.teamIsPrivate = data.teamIsPrivate === 'on';

    // 팀 위치 변환
    data.teamLocation = transformTeamLocation(data.teamLocation);

    // 트림 처리
    data.teamName = data.teamName.trim();
    data.teamContent = data.teamContent.trim(); // 추가

    return data;
  };

  const SubmitTeamForm = (target: React.FormEvent<HTMLFormElement>) => {
    target.preventDefault();

    const formData = new FormData(target.currentTarget);
    // formData.delete('teamContent'); // 제거해야함

    const data = transformFormData(formData);

    if (
      data.teamName === '' ||
      // data.teamContent === '' ||
      data.teamStatus === ''
    ) {
      alert('모든 항목을 입력해주세요.'); // 임시
      return;
    }

    data.teamKey = teamKey;
    data.teamMates = teamData.teamMates;
    data.teamAward = teamData.teamAward;
    data.teamAwardPriority = teamData.teamAwardPriority;

    console.log(data);

    sendRequest(
      'PATCH',
      'admin/team',
      data,
      {},
      (res: any) => {
        router.back();
      },
      (err: string) => {
        console.error(err);
      }
    );
  };

  return (
    <form onSubmit={SubmitTeamForm} className={styles.container}>
      <div className={styles.pageContianer}>
        <TitleInput
          name='teamName'
          label='팀 이름'
          placeholder='팀 이름을 입력해주세요'
          defaultValue={teamData.teamName}
        />

        <div className={styles.label_text}>
          팀장 : {teamData.teamLeaderIntraId}
        </div>
        <DescriptionInput
          name='teamContent'
          label='팀 설명'
          placeholder='팀 설명을 입력해주세요'
          defaultValue={teamData.teamContent}
        />
        <SelectInput
          name='teamStatus'
          label='팀 상태'
          options={['OPEN', 'CONFIRM', 'CANCEL']}
          selected={teamData.teamStatus}
        />

        {teamData.teamLocation === 'MIX' ? (
          <input type='hidden' name='teamLocation' value={'MIX'} />
        ) : (
          <SelectInput
            name='teamLocation'
            label='클러스터 위치'
            options={['서울', '경산', '둘다']}
            selected={teamData.teamLocation}
          />
        )}
        <CheckBoxInput
          name='teamIsPrivate'
          label='비밀방(초대만 가능, 대회 내역에서 보이지 않음)'
          checked={teamData.teamIsPrivate} // 팀 상세 페이지 - 수정
        />
        <div className={styles.label_text}>상 이름 : {teamData.teamAward}</div>
        <div className={styles.label_text}>
          상 순위 : {teamData.teamAwardPriority}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            router.back();
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

export default AdminTeamFrom;
