//주최자 결과입력 페이지
import AgendaResultForm from 'components/agenda/Form/AgendaResultForm';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

const SubmitAgendaResult = () => {
  const teamlist = [
    'apple',
    'banana',
    'cider',
    'dumpling',
    'egg',
    'fish',
    'grape',
    'honey',
  ];

  const SubmitAgendaResult = (
    awardList: {
      award: string;
      teams: string[];
    }[]
  ) => {
    console.log(awardList);
    // 에러일 경우: 상은 있는데 팀이 없는 경우
    // 한 팀이 여러 상을 받는 경우
    // 상 안에서 같은 팀이 여러번 나오는 경우
  };
  return (
    <div className={styles.container}>
      <AgendaResultForm
        teamlist={teamlist}
        SubmitAgendaResult={SubmitAgendaResult}
      />
    </div>
  );
};

export default SubmitAgendaResult;
