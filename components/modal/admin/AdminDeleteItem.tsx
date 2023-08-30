import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { mockInstance } from 'utils/mockAxios';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminDeleteItem.module.scss';

export default function AdminDeleteItemModal(props: Item) {
  const { itemId, itemName, mainContent } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const user = useRecoilValue(userState).intraId;

  // instanceInManage로 변경
  // delete에 body 담기
  const deleteItemHandler = async (itemId: number) => {
    try {
      await mockInstance.delete(`/admin/items/${itemId}`, {
        data: { deleterIntraId: user },
      });
      setSnackBar({
        toastName: 'delete item',
        severity: 'success',
        message: `${itemId}번 ${name}이 삭제되었습니다!`,
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
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>아이템명 :</div>
            <input className={styles.intraBlank} value={itemName} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>설명 :</div>
            <textarea
              className={styles.contentBlank}
              value={mainContent}
              readOnly
            />
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
