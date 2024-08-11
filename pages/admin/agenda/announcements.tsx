import { useRouter } from 'next/router';
import AnnouncementTable from 'components/admin/agenda/announcements/AnnouncementTable';

export default function Announcements() {
  const router = useRouter();
  const { agendaKey } = router.query;
  console.log(agendaKey);
  return (
    <>
      <p>here {agendaKey}</p>
      <AnnouncementTable />
    </>
  );
}
