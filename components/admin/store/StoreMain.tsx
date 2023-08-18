import styles from 'styles/admin/store/StoreMain.module.scss';
import ChangeHistory from './itemHistory';
import ItemList from './ItemList';

function StoreMain() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>상점 관리</div>
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
