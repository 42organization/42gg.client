import { TicketHistoryAPIProps } from 'types/aganda/ticketTypes';
import TicketHistory from 'components/agenda/Ticket/TicketHistory';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';

const TicketHistoryPage = () => {
  const history = useFetchGet<TicketHistoryAPIProps>(
    '/ticket/history?page=1&size=20'
  );
  if (!history.data) history.data = { totalSize: 0, content: [] };

  return (
    <div>
      <TicketHistory data={history.data.content} />
      <PageNation
        curPage={1}
        totalPages={1}
        pageChangeHandler={(pageNumber: number) => {
          console.log(pageNumber);
        }}
      />
    </div>
  );
};

export default TicketHistoryPage;
