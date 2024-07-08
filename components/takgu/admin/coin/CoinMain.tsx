import CoinPolicy from 'components/takgu/admin/coin/CoinPolicy';
import CoinPolicyHistory from 'components/takgu/admin/coin/CoinPolicyHistory';
import styles from 'styles/takgu/admin/coin/CoinMain.module.scss';

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
