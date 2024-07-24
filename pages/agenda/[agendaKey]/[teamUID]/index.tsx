import { useRouter } from 'next/router';
// import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';

export default function TeamDetail() {
  const router = useRouter();
  console.log(router.query);
  const { teamUID } = router.query;
  return (
    <>
      {/* <AgendaInfo type='team' /> 이거 어케 가져오지 */}
      <TeamInfo />
      <div>teamKey: {teamUID}</div>
    </>
  );
}
