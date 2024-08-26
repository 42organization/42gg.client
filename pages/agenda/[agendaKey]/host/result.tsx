//주최자 결과입력 페이지
import { useRouter } from 'next/router';
import { ParticipantProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaResultForm from 'components/agenda/Form/AgendaResultForm';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

const SubmitAgendaResult = () => {
  const { data } = useFetchGet<{
    totalSize: number;
    content: ParticipantProps[];
  }>(`team/confirm/list`, { size: 100 }) || { data: {}, status: 400 };
  const teamlist = data?.content.map((team) => team.teamName) || [];

  const router = useRouter();
  const { agendaKey: agenda_key } = router.query;

  const SubmitAgendaResult = (
    awardList: {
      award: string;
      teams: string[];
    }[]
  ) => {
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
    });
    // 프론트 처리 에러
    // 상은 있는데 팀이 없는 경우
    // 한 팀이 여러 상을 받는 경우
    // 상 안에서 같은 팀이 여러번 나오는 경우
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
