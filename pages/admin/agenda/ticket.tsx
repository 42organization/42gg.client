import router from 'next/router';
import TicketTable from 'components/admin/agenda/ticket/TicketTable';

export default function Ticket() {
  const { intraId } = router.query;

  if (!intraId) {
    return <div>유저 목록에서 티켓조회를 클릭해주세요!</div>;
  }
  return (
    <>
      <TicketTable intraId={intraId as string} />
    </>
  );
}
