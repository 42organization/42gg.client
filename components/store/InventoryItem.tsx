import Image from 'next/image';
import { Tooltip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { BsGiftFill, BsCircleFill } from 'react-icons/bs';
import { InventoryItem } from 'types/storeTypes';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/store/Inventory.module.scss';

type inventoryItemProps = {
  item: InventoryItem;
};

export function InvetoryItem({ item }: inventoryItemProps) {
  const user = useRecoilValue(userState);
  const { itemId, name, imageUrl, purchaserIntra, itemStatus } = item;
  return (
    <div key={itemId} className={styles.inventoryItem}>
      <div className={styles.topBadgeContainer}>
        {user.intraId !== purchaserIntra && (
          <Tooltip title={`from ${purchaserIntra}`}>
            <BsGiftFill />
          </Tooltip>
        )}
        {itemStatus === 'USING' && (
          <div>
            <BsCircleFill /> 사용중
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        {itemStatus === 'USING' ? (
          <button>편집하기</button>
        ) : (
          <button>사용하기</button>
        )}
      </div>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={imageUrl} alt={name} fill />
      </div>
      <div>{name}</div>
    </div>
  );
}
