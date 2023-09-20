import { FaPlus, FaMinus } from 'react-icons/fa';
import { ICoinHistory } from 'types/userTypes';
import { dateToStringShort } from 'utils/handleTime';
import styles from 'styles/modal/store/CoinHistoryDetails.module.scss';

export default function CoinHistoryDetails({
  details,
}: {
  details: ICoinHistory;
}) {
  const { createdAt, history, amount } = details;

  return (
    <div className={styles.data}>
      <div className={styles.section1}>
        <div className={styles.icon}>
          {amount > 0 ? (
            <FaPlus className={styles.plus} />
          ) : (
            <FaMinus className={styles.minus} />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.history}>{history}</div>
          <div className={styles.date}>
            {dateToStringShort(new Date(createdAt))}
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        {amount > 0 ? (
          <div className={styles.plus}>+{amount.toLocaleString()}</div>
        ) : (
          <div className={styles.minus}>{amount.toLocaleString()}</div>
        )}
      </div>
    </div>
  );
}
