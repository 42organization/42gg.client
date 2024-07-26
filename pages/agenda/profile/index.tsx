import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

export default function AgendaProfile() {
  return (
    <>
      <div className={styles.agendaProfileContainer}>
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
      </div>
    </>
  );
}
