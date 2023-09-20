import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import { InventoryList } from 'components/store/InventoryList';
import ItemsList from 'components/store/purchase/ItemsList';
import styles from 'styles/store/StoreContainer.module.scss';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const dummyCoin = { coin: 0 }; // data가 undefined일 때 대비
  const setError = useSetRecoilState(errorState);

  const { data, isError } = useQuery<ICoin>(
    'coin',
    () => instance.get('/pingpong/users/coin').then((res) => res.data),
    { retry: 1 }
  );

  if (isError) {
    setError('JY01');
  }

  if (!data) return null;
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>GG Store</h1>
      <StoreModeWrap
        currentMode={mode}
        setStoreMode={setMode}
        coin={data ? data : dummyCoin}
      />
      <div className={styles.storeContainer}>
        {mode === 'BUY' ? <ItemsList /> : <InventoryList />}
      </div>
    </div>
  );
}
