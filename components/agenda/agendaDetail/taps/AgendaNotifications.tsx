import NotificationItem from 'components/agenda/agendaDetail/taps/NotificationItem';
import styles from 'styles/agenda/agendaDetail/taps/AgendaNotifications.module.scss';

export default function AgendaNotifications() {
  return (
    <>
      <div className={styles.notificationsList}>
        <NotificationItem />
        <NotificationItem />
      </div>
    </>
  );
}
