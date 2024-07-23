import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';

export default function TeamDetail() {
  return (
    <>
      <AgendaInfo type='team' />
      <TeamInfo />
    </>
  );
}
