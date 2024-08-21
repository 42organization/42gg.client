import { TicketHistoryProps } from 'types/aganda/ticketTypes';
import TicketHistory from 'components/agenda/Ticket/TicketHistory';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';

const TicketHistoryPage = () => {
  const size = 5;
  const res = usePageNation<TicketHistoryProps>({
    url: '/ticket/history',
    size: size,
    useIdx: true,
  });

  const { currentPage, totalPages, pageChangeHandler, content } = res;
  return (
    <div>
      <TicketHistory data={content} />
      <PageNation
        curPage={currentPage}
        totalPages={totalPages.current}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default TicketHistoryPage;
