import styles from "styles/admin/coin/CoinMain.module.scss";
import CoinPolicy from "./CoinPolicy";
import CoinPolicyHistory from "./CoinPolicyHistory";

export default function CoinMain () {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h2>재화 정책 관리</h2>
            </div>
            <div className={styles.subContainer}>
                <h4>재화 정책 변경</h4>
                <CoinPolicy />
            </div>
            <div className={styles.subContainer}>
                <h4>재화 정책 변경 이력</h4>
                <CoinPolicyHistory />
            </div>
        </div>
    )
}
