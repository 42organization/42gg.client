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

  const {
    receiptId,
    itemName,
    imageUri,
    purchaserIntra,
    itemCode,
    itemStatus,
  } = item;

  function handleUseItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // TODO : 해당하는 아이템에 맞는 사용 모달 띄우기
  }

  function handleEditItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault;
    if (itemCode !== 'MEGAPHONE') {
      alert('편집할 수 없는 아이템입니다.');
      return;
    }
    // EditItemModal
  }

  return (
    <div key={receiptId} className={styles.inventoryItem}>
      <div className={styles.topBadgeContainer}>
        {user.intraId !== purchaserIntra ? (
          <Tooltip title={`from ${purchaserIntra}`}>
            <button>
              <BsGiftFill />
            </button>
          </Tooltip>
        ) : (
          <div></div>
        )}
        {itemStatus === 'USING' && (
          <div className={styles.usingBadge}>
            <BsCircleFill /> 사용중
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        {itemStatus === 'USING' ? (
          <button onClick={handleEditItem}>편집하기</button>
        ) : (
          <button onClick={handleUseItem}>사용하기</button>
        )}
      </div>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={imageUri} alt={itemName} fill />
      </div>
      <div className={styles.itemName}>{itemName}</div>
    </div>
  );
}
