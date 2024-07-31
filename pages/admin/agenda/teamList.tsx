import { useRouter } from 'next/router';
import TeamTable from 'components/admin/agenda/teamList/TeamTable';

export default function TeamList() {
  const router = useRouter();
  const { agenda_key } = router.query;
  console.log(agenda_key);
  return (
    <>
      <p>here {agenda_key}</p>
      <TeamTable />
    </>
  );
}
