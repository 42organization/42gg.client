import { useRouter } from 'next/router';
import TeamTable from 'components/admin/agenda/teamList/TeamTable';

export default function TeamList() {
  const router = useRouter();
  const { agendaKey } = router.query;
  return (
    <>
      <p>here {agendaKey}</p>
      <TeamTable />
    </>
  );
}
