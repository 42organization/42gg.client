import { ICoinHistory } from 'types/userTypes';
import CoinHistoryDetails from 'components/modal/store/CoinHistoryDetails';
import styles from 'styles/modal/store/CoinHistoryContainer.module.scss';

type CoinHistoryProps = {
  useCoinList: ICoinHistory[];
};

export default function CoinHistoryContainer({
  useCoinList,
}: CoinHistoryProps) {
  return (
    <div className={styles.container}>
      {useCoinList.length === 0 ? (
        <div className={styles.empty}>GG코인 내역이 존재하지 않습니다.</div>
      ) : (
        useCoinList.map((coinHistory) => (
          <CoinHistoryDetails
            key={coinHistory.createdAt.toString()}
            details={coinHistory}
          />
        ))
      )}
    </div>
  );
}
