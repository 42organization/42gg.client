import Ticket from 'components/agenda/Ticket/Ticket';
import styles from 'styles/agenda/Ticket/Ticket.module.scss';
const ticket = () => {
  return (
    <div className={styles.pageContainer}>
      <Ticket type='page' />
    </div>
  );
};

export default ticket;
