import AgendaHistory from 'components/agenda/Profile/AgendaHistory';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import ParticipatingTeam from 'components/agenda/Profile/ParticipatingTeam';
import AgendaProfileContent from 'components/agenda/Profile/ProfileContent';
import AgendaProfileImageBox from 'components/agenda/Profile/ProfileImageCard';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

export default function AgendaProfile() {
  return (
    <>
      <div className={styles.agendaProfileContainer}>
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
        <AgendaProfileImageBox />
        <AgendaProfileContent />
        <ParticipatingTeam />
        <AgendaHistory />
      </div>
    </>
  );
}
