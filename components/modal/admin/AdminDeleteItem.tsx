import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminDeleteItem.module.scss';

export default function AdminDeleteItemModal(item: Item) {
  const { itemId, itemName, mainContent, subContent } = item;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation(() => {
    return instanceInManage.delete(`/items/${itemId}`);
  });

  if (isError) {
    setSnackBar({
      toastName: 'delete item',
      severity: 'error',
      message: `API 요청에 문제가 발생했습니다.`,
      clicked: true,
    });
    setModal({ modalName: null });
  }

  if (isSuccess) {
    setSnackBar({
      toastName: 'delete item',
      severity: 'success',
      message: `${itemId}번 ${itemName}이 삭제되었습니다!`,
      clicked: true,
    });
    queryClient.invalidateQueries('itemList');
    queryClient.invalidateQueries('itemHistoryList');
    setModal({ modalName: null });
  }

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
          <button className={styles.deleteBtn} onClick={() => mutate}>
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
