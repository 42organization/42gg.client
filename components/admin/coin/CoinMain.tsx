import styles from 'styles/admin/coin/CoinMain.module.scss';
import CoinPolicy from './CoinPolicy';
import CoinPolicyHistory from './CoinPolicyHistory';

export default function CoinMain() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>재화 정책 관리</div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>재화 정책 변경</div>
        <CoinPolicy />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.sectionTitle}>재화 정책 변경 이력</div>
        <CoinPolicyHistory />
      </div>
    </div>
  );
}
