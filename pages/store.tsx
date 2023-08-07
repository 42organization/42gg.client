import { useState } from 'react';
import { useRouter } from 'next/router';
import { StoreMode } from 'types/storeTypes';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import { Inventory } from 'components/store/Inventory';
import styles from 'styles/store/StoreContainer.module.scss';
import ItemsList from 'components/shop/ItemsList';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const router = useRouter();

  const clickTitleHandler = () => {
    router.push(`/store`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title} onClick={clickTitleHandler}>
        GG Store
      </h1>
      <StoreModeWrap currentMode={mode} setStoreMode={setMode} />
      <div className={styles.storeContainer}>
        {mode === 'BUY' ? (
          <div>
            <ItemsList />
          </div>
        ) : (
          <Inventory />
        )}
      </div>
    </div>
  );
}
