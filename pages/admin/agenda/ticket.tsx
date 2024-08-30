import router from 'next/router';
import TicketTable from 'components/admin/agenda/ticket/TicketTable';

export default function Ticket() {
  const { intraId } = router.query;

  return (
    <>
      <TicketTable intraId={intraId as string} />
    </>
  );
}
