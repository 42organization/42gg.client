import { useRef } from 'react';
import { CancelBtn } from 'components/agenda/button/Buttons';
import CreateAgendaForm from 'components/agenda/Form/CreateAgendaForm';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

interface AgendaProps {
  agendaTitle: string;
  agendaContent: string; // 상세설명으로 들어감
  agendaDeadLine: Date; // 모집완료기간 (이전까지 모집기간, 이후 진행대기)
  agendaStartTime: Date; // 이벤트기간 시작 (진행중)
  agendaEndTime: Date; // 이벤트기간 마감
  agendaMinTeam: number; // 팀 제한
  agendaMaxTeam: number;
  agendaMinPeople: number; // 팀내 인원 제한
  agendaMaxPeople: number;
  agendaPoster: File;
  agendaLocation: string; // ENUM 참조
  agendaIsRanking: boolean; // 대회인지 확인
}
const saveLocal = () => {
  console.log('saveLocal', '팀 만들기');
};

// const readInput = () => {};

const submitTeamForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(e.target);
  const data = new FormData(e.target as HTMLFormElement);
  console.log(data);
};

const CreateAgenda = () => {
  const agendaData = useRef<AgendaProps>({} as AgendaProps);
  return (
    <div className={styles.container}>
      <div>
        <CancelBtn onClick={saveLocal} />
      </div>
      <h2 className={styles.title}>새로운 아젠다 만들기</h2>
      <p className={styles.description}>당부사항</p>
      <CreateAgendaForm handleSubmit={submitTeamForm} data={agendaData} />
    </div>
  );
};

export default CreateAgenda;
