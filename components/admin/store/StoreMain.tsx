import StoreItemHistory from 'components/admin/store/StoreItemHistory';
import StoreItemList from 'components/admin/store/StoreItemList';
import styles from 'styles/admin/store/StoreMain.module.scss';

function StoreMain() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>아이템 목록</div>
        <StoreItemList />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>변경 이력</div>
        <StoreItemHistory />
      </div>
    </div>
  );
}

export default StoreMain;
