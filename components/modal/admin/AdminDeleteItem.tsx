import { useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { IUpdate } from 'types/modalTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminDeleteItem.module.scss';

export default function AdminDeleteItemModal({
  item,
  state,
}: {
  item: Item;
  state: IUpdate;
}) {
  const { itemId, itemName, mainContent, subContent } = item;
  const { setUpdate } = state;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const deleteItemHandler = async (itemId: number) => {
    try {
      await instanceInManage.delete(`/items/${itemId}`);
      setSnackBar({
        toastName: 'delete item',
        severity: 'success',
        message: `${itemId}번 ${itemName}이 삭제되었습니다!`,
        clicked: true,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'delete item',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
    setUpdate(true);
    setModal({ modalName: null });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>아이템 삭제</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.itemWrap}>
            <label htmlFor='itemName' className={styles.bodyText}>
              아이템명 :
            </label>
            <input
              id='itemName'
              className={styles.itemBlank}
              value={itemName}
              readOnly
            />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.mainContentWrap}>
              <label htmlFor='itemMainContent' className={styles.bodyText}>
                주설명 :
              </label>
              <input
                id='itemMainContent'
                className={styles.mainContentBlank}
                value={mainContent}
                readOnly
              />
            </div>
            <div className={styles.subContentWrap}>
              <label htmlFor='itemSubContent' className={styles.bodyText}>
                부설명 :
              </label>
              <textarea
                id='itemSubContent'
                className={styles.subContentBlank}
                value={subContent}
                readOnly
              />
            </div>
          </div>
          <div className={styles.checkWrap}>
            {itemId} 번 아이템을 삭제하시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteItemHandler(itemId)}
          >
            삭제
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
