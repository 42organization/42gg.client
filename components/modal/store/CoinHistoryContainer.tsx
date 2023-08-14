import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { useEffect, useState } from 'react';
import CoinHistoryDetails from './CoinHistoryDetails';
import { ICoinHistoryList } from 'types/userTypes';
import styles from 'styles/modal/store/CoinHistoryContainer.module.scss';

// TODO: 페이지네이션 구현
export default function CoinHistoryContainer() {
  const [coinHistoryList, setCoinHistoryList] = useState<ICoinHistoryList>({
    useCoinList: [],
    totalPage: 0,
  });

  useEffect(() => {
    getCoinHistoryList();
  }, []);

  const getCoinHistoryList = useMockAxiosGet({
    url: '/users/coin?page=1&size=5',
    setState: setCoinHistoryList,
    err: 'HB03',
    type: 'setError',
  });

  return (
    <div className={styles.container}>
      {coinHistoryList.useCoinList.length === 0 ? (
        <div className={styles.empty}>GG코인 내역이 존재하지 않습니다.</div>
      ) : (
        coinHistoryList.useCoinList.map((coinHistory) => (
          <CoinHistoryDetails
            key={coinHistory.createdAt.toString()}
            details={coinHistory}
          />
        ))
      )}
    </div>
  );
}
