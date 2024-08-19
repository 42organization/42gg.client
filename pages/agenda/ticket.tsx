import Ticket from 'components/agenda/Ticket/Ticket';
interface TicketProps {
  ticketCount: number;
}

const ticket = () => {
  return (
    <div>
      <Ticket type='page' />
    </div>
  );
};

export default ticket;
