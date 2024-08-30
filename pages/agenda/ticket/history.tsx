import { TicketHistoryProps } from 'types/aganda/ticketTypes';
import TicketHistory from 'components/agenda/Ticket/TicketHistory';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';

const TicketHistoryPage = () => {
  const size = 5;
  const { PagaNationElementProps, content } = usePageNation<TicketHistoryProps>(
    {
      url: '/ticket/history',
      size: size,
      useIdx: true,
    }
  );

  return (
    <div>
      <TicketHistory data={content} />
      <PageNation {...PagaNationElementProps} />
    </div>
  );
};

export default TicketHistoryPage;
