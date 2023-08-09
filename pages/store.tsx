import { useEffect, useState } from 'react';
import { ICoin } from 'types/userTypes';
import { StoreMode } from 'types/inventoryTypes';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import ItemsList from 'components/shop/ItemsList';
import { Inventory } from 'components/store/Inventory';
import styles from 'styles/store/StoreContainer.module.scss';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const [coin, setCoin] = useState<ICoin>({ coin: 0 });
  useEffect(() => {
    getCoin();
    // TODO : 코인이 바뀔 때 마다 다시 불러와야 한다.
  }, []);
  const getCoin = useMockAxiosGet({
    url: '/users/coin',
    setState: setCoin,
    err: 'JY01',
    type: 'setError',
  });

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>GG Store</h1>
      <StoreModeWrap currentMode={mode} setStoreMode={setMode} coin={coin} />
      <div className={styles.storeContainer}>
        {mode === 'BUY' ? <ItemsList /> : <Inventory />}
      </div>
    </div>
  );
}
