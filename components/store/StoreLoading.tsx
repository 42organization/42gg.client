import { RiPingPongFill } from 'react-icons/ri';
import styles from 'styles/store/Inventory.module.scss';

export default function StoreLoading() {
  return (
    <div className={styles.loadIcon}>
      <RiPingPongFill />
    </div>
  );
}
