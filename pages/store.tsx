import { useEffect, useState } from 'react';
import styles from 'styles/store/StoreContainer.module.scss';
import { StoreMode } from 'types/storeTypes';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import { useRouter } from 'next/router';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const router = useRouter();

  const clickTitleHandler = () => {
    router.push(`/store`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title} onClick={clickTitleHandler}>
        GG Store
      </h1>
      <StoreModeWrap currentMode={mode} setStoreMode={setMode} />
    </div>
  );
}
