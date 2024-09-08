import router from 'next/router';
import { useState } from 'react';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { transformTeamLocation } from 'utils/agenda/transformLocation';
import { Coalition, TeamStatus } from 'constants/agenda/agenda';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import { AddElementBtn, CancelBtn } from 'components/agenda/button/Buttons';
import CheckBoxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface AdminTeamFormProps {
  teamKey: string;
  teamData: TeamDetailProps;
  teamLocation: string;
}

const AdminTeamForm = ({
  teamKey,
  teamData,
  teamLocation,
}: AdminTeamFormProps) => {
  const sendRequest = useFetchRequest().sendRequest;
  const [teamMates, setTeamMates] = useState(teamData.teamMates);

  const transformFormData = (formData: FormData) => {
    const data = Object.fromEntries(formData) as any;
    return {
      ...data,
      teamIsPrivate: data.teamIsPrivate === 'on',
      teamLocation: transformTeamLocation(data.teamLocation),
      teamName: data.teamName.trim(),
      teamContent: data.teamContent.trim(),
    };
  };

  const handleDeleteParticipant = (index: number) => {
    setTeamMates((prev) => prev.filter((_, i) => i !== index));
  };

  const isLeader = (intraId: string) => {
    return teamData.teamLeaderIntraId === intraId;
  };

  const handleAddMember = () => {
    const newMemberId = (
      document.getElementById('newMemberId') as HTMLInputElement
    )?.value.trim();

    if (!newMemberId) {
      alert('intra ID를 입력해주세요.');
      return;
    }
    if (teamMates.some((member) => member.intraId === newMemberId)) {
      alert('이미 존재하는 팀원입니다.');
      return;
    }
    setTeamMates((prev) => [
      ...prev,
      { intraId: newMemberId, coalition: Coalition.OTHER },
    ]);
    (document.getElementById('newMemberId') as HTMLInputElement).value = '';
  };

  const AddLeader = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      teamData.teamStatus === TeamStatus.CANCEL &&
      e.target.value !== TeamStatus.CANCEL
    ) {
      if (
        !teamMates.some(
          (member) => member.intraId === teamData.teamLeaderIntraId
        )
      ) {
        setTeamMates((prev) => [
          { intraId: teamData.teamLeaderIntraId, coalition: Coalition.OTHER }, // 팀장을 가장 앞에 추가
          ...prev,
        ]);
      }
    }
  };

  const SubmitTeamForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = transformFormData(formData);

    if (!data.teamName || !data.teamContent || !data.teamStatus) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    sendRequest(
      'PATCH',
      'admin/team',
      {
        ...data,
        teamKey,
        teamMates,
        teamAward: teamData.teamAward,
        teamAwardPriority: teamData.teamAwardPriority,
      },
      {},
      () => router.back(),
      (err: string) => console.error(err)
    );
  };

  return (
    <form
      id='teamModify'
      onSubmit={SubmitTeamForm}
      className={styles.container}
    >
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
          options={['OPEN', 'CONFIRM']}
          selected={teamData.teamStatus}
          onChange={(e) => {
            AddLeader(e);
          }}
        />
        {teamLocation === 'MIX' ? (
          <input type='hidden' name='teamLocation' value={'MIX'} />
        ) : (
          <SelectInput
            name='teamLocation'
            label='클러스터 위치'
            options={['SEOUL', 'GYEONGSAN', 'MIX']}
            selected={teamLocation}
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
        <div className={styles.label_text}>팀원</div>
        <div className={styles.label_text}>
          <input
            type='text'
            id='newMemberId'
            placeholder='intraID'
            className={styles.input}
          />
          <AddElementBtn onClick={handleAddMember} />
        </div>
        <div className={styles.ListContainer}>
          {teamMates.map((participant, index) => (
            <div key={index} className={styles.buttonContainer}>
              <Participant
                key={index}
                teamName={participant.intraId}
                coalitions={participant.coalition}
              />
              {!isLeader(participant.intraId) && (
                <CancelBtn onClick={() => handleDeleteParticipant(index)} />
              )}
            </div>
          ))}
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
        <button
          type='submit'
          form='teamModify'
          className={`${styles.formBtn} ${styles.submit}`}
        >
          수정
        </button>
      </div>
    </form>
  );
};

export default AdminTeamForm;
