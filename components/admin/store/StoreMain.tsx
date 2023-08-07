import ItemList from './ItemList';
import ChangeHistory from './itemHistory';
import styles from 'styles/admin/store/StoreMain.module.scss';

function StoreMain() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h2>상점 관리</h2>
      </div>
      <div className={styles.subContainer}>
        <h4>아이템 목록</h4>
        <ItemList />
      </div>
      <div className={styles.subContainer}>
        <h4>변경 이력</h4>
        <ChangeHistory />
      </div>
    </div>
  );
}

export default StoreMain;
