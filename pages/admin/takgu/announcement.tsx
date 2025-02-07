import AnnounceEdit from 'components/admin/takgu/announcement/AnnounceEdit';
import AnnounceList from 'components/admin/takgu/announcement/AnnounceList';
import styles from 'styles/admin/takgu/announcement/Announcement.module.scss';
export default function Announcement() {
  return (
    <div className={styles.container}>
      <AnnounceEdit />
      <AnnounceList />
    </div>
  );
}
