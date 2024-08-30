import { GoSearch } from 'react-icons/go';
import styles from 'styles/agenda/Profile/AgendaUserSearchBar.module.scss';

const AgendaUserSearchBar = () => {
  return (
    <div className={styles.agendaUserSearchBar}>
      <input type='text' placeholder='Search User' maxLength={12} />
      <GoSearch className={styles.imageBox} />
    </div>
  );
};

export default AgendaUserSearchBar;
