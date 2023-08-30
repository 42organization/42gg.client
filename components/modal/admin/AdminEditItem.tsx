import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { mockInstance } from 'utils/mockAxios';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import useUploadImg from 'hooks/useUploadImg';
import styles from 'styles/admin/modal/AdminEditItem.module.scss';

export default function AdminEditItemModal(props: Item) {
  const { itemId, itemName, mainContent, imageUri, originalPrice, discount } =
    props;
  const creator = useRecoilValue(userState).intraId;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const { imgData, imgPreview, uploadImg } = useUploadImg();

  // instanceInManage로 변경
  const editItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const content = form.get('content');
    const price = Number(form.get('price'));
    const discount = Number(form.get('discount'));

    if (price < 0 || discount < 0 || discount > 100) {
      setSnackBar({
        toastName: 'invalid value',
        severity: 'error',
        message: '가격 또는 할인율이 유효하지 않습니다.',
        clicked: true,
      });
      return;
    }

    const formData = new FormData();
    const data = {
      name: name,
      content: content,
      price: price,
      discount: discount,
      creatorIntra: creator,
    };
    formData.append(
      'updateItemInfo',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );
    if (imgData) {
      formData.append('imgData', new Blob([imgData], { type: 'image/jpeg' }));
    }

    try {
      await mockInstance.put(`/admin/items/${itemId}`, formData);
      setSnackBar({
        toastName: 'edit item',
        severity: 'success',
        message: '아이템 정보가 수정되었습니다.',
        clicked: true,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'edit item',
        severity: 'error',
        message: `아이템 정보를 수정할 수 없습니다.`,
        clicked: true,
      });
    }
    setModal({ modalName: null });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>아이템 수정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <form className={styles.bodyWrap} onSubmit={editItemHandler}>
          <label className={styles.imageWrap}>
            <Image
              src={imgPreview ? imgPreview : imageUri}
              alt='Item Image'
              width={90}
              height={80}
            />
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={uploadImg}
            />
          </label>
          <div className={styles.idNameWrap}>
            <div className={styles.idWrap}>
              <div className={styles.bodyText}>아이템 ID :</div>
              <input className={styles.idBlank} value={itemId} readOnly />
            </div>
            <div className={styles.nameWrap}>
              <div className={styles.bodyText}>아이템명 :</div>
              <input
                className={styles.nameBlank}
                type='text'
                name='name'
                defaultValue={itemName}
                required
              />
            </div>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>설명 :</div>
            <input
              className={styles.contentBlank}
              type='text'
              name='content'
              defaultValue={mainContent}
              required
            />
          </div>
          <div className={styles.priceDiscountWrap}>
            <div className={styles.priceWrap}>
              <div className={styles.bodyText}>원가 :</div>
              <input
                className={styles.priceBlank}
                type='number'
                name='price'
                defaultValue={originalPrice}
                required
              />
            </div>
            <div className={styles.discountWrap}>
              <div className={styles.bodyText}>할인율 :</div>
              <input
                className={styles.discountBlank}
                type='number'
                name='discount'
                defaultValue={discount}
                required
              />
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <input className={styles.editBtn} type='submit' value='수정' />
            <input
              className={styles.cancelBtn}
              type='button'
              value='취소'
              onClick={() => setModal({ modalName: null })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
