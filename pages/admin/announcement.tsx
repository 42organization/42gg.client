import AnnounceEdit from 'components/admin/announcement/AnnounceEdit';
import AnnounceList from 'components/admin/announcement/AnnounceList';
import styles from 'styles/admin/announcement/announcement.module.scss';
export default function Announcement() {
  return (
    <div className={styles.container}>
      <AnnounceEdit />
      <AnnounceList />
    </div>
  );
}
