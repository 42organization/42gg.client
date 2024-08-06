//주최자 결과입력 페이지
import { instanceInAgenda } from 'utils/axios';
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
    const Data: {
      awardName: string;
      teamName: string;
      awardPriority: number;
    }[] = [];
    awardList.forEach((awardInfo, key) => {
      awardInfo.teams.forEach((team) => {
        Data.push({
          awardName: awardInfo.award,
          teamName: team,
          awardPriority: key,
        });
      });
      console.log('data', Data);
    });
    console.log(Data);
    // 프론트 처리 에러
    // 상은 있는데 팀이 없는 경우
    // 한 팀이 여러 상을 받는 경우
    // 상 안에서 같은 팀이 여러번 나오는 경우
    const agenda_key = '1ae456ea-c5fd-48d0-b192-607d11942322'; //임시 키
    instanceInAgenda
      .patch(`/confirm?agenda_key=${agenda_key}`, { awards: Data })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
