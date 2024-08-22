import CoinPolicy from 'components/admin/takgu/coin/CoinPolicy';
import CoinPolicyHistory from 'components/admin/takgu/coin/CoinPolicyHistory';
import styles from 'styles/admin/takgu/coin/CoinMain.module.scss';

export default function CoinMain() {
  return (
    <div className={styles.mainContainer}>
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
