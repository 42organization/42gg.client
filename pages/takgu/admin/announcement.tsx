import AnnounceEdit from 'components/takgu/admin/announcement/AnnounceEdit';
import AnnounceList from 'components/takgu/admin/announcement/AnnounceList';
import styles from 'styles/takgu/admin/announcement/Announcement.module.scss';
export default function Announcement() {
  return (
    <div className={styles.container}>
      <AnnounceEdit />
      <AnnounceList />
    </div>
  );
}
