import { ICoinHistory } from 'types/userTypes';
import { getFormattedDateToString } from 'utils/handleTime';
import styles from 'styles/modal/store/CoinHistoryDetails.module.scss';
import { FaPlus, FaMinus, FaCoins } from 'react-icons/fa';

export default function CoinHistoryDetails({
  details,
}: {
  details: ICoinHistory;
}) {
  const { createdAt, history, amount } = details;
  const { year, month, date, hour, min } = getFormattedDateToString(
    new Date(createdAt)
  );
  const DATE = `${year.slice(2)}-${month}-${date}`;
  const TIME = `${hour}:${min}`;

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
          <div className={styles.date}>{`${DATE} ${TIME}`}</div>
        </div>
      </div>
      <div className={styles.section2}>
        {amount > 0 ? (
          <div className={styles.plus}>
            +{amount} <FaCoins />
          </div>
        ) : (
          <div className={styles.minus}>
            {amount} <FaCoins />
          </div>
        )}
      </div>
    </div>
  );
}
