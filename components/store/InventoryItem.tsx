import Image from 'next/image';
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
      <div className={styles.overlay}>
        {itemStatus === 'USING' ? (
          <button>편집하기</button>
        ) : (
          <button>사용하기</button>
        )}
      </div>
      {user.intraId !== purchaserIntra && <BsGiftFill />}
      {itemStatus === 'USING' && (
        <div>
          <BsCircleFill /> 사용중
        </div>
      )}
      <Image src={imageUrl} alt={name} width={100} height={100} />
      <div>{name}</div>
    </div>
  );
}
