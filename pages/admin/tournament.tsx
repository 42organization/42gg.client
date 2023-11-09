import TournamentEdit from 'components/admin/tournament/TournamentEdit';
import TournamentList from 'components/admin/tournament/TournamentList';
import styles from 'styles/admin/announcement/Announcement.module.scss';

export default function Tournament() {
  return (
    <div className={styles.container}>
      <TournamentEdit />
      <TournamentList />
    </div>
  );
}
