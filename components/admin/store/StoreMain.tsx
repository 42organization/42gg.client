import ChangeHistory from 'components/admin/store/itemHistory';
import ItemList from 'components/admin/store/ItemList';
import styles from 'styles/admin/store/StoreMain.module.scss';

function StoreMain() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>아이템 목록</div>
        <ItemList />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <ChangeHistory />
      </div>
    </div>
  );
}

export default StoreMain;
