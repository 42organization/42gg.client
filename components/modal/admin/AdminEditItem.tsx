import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import useUploadImg from 'hooks/useUploadImg';
import styles from 'styles/admin/modal/AdminEditItem.module.scss';

export default function AdminEditItemModal(props: Item) {
  const {
    itemId,
    itemName,
    mainContent,
    subContent,
    imageUri,
    originalPrice,
    discount,
    itemType,
  } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const { imgData, imgPreview, uploadImg } = useUploadImg({
    maxSizeMB: 0.03,
    maxWidthOrHeight: 250,
  });

  const editErrorResponse: { [key: string]: string } = {
    IT200: '아이템 타입이 일치하지 않습니다.',
    IT413: '아이템 이미지가 너무 큽니다.',
    IT415: '아이템 이미지 타입이 jpeg가 아닙니다.',
  };

  const editItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const mainContent = form.get('mainContent');
    const subContent = form.get('subContent');
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
      mainContent: mainContent,
      subContent: subContent,
      price: price,
      discount: discount,
      itemType: itemType,
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
      await instanceInManage.post(`/items/${itemId}`, formData);
      setSnackBar({
        toastName: 'edit item',
        severity: 'success',
        message: '아이템 정보가 수정되었습니다.',
        clicked: true,
      });
    } catch (e: any) {
      if (e.response.data.code in editErrorResponse) {
        setSnackBar({
          toastName: 'edit item',
          severity: 'error',
          message: editErrorResponse[e.response.data.code],
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'edit item',
          severity: 'error',
          message: `아이템 정보를 수정할 수 없습니다.`,
          clicked: true,
        });
      }
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
              src={imgPreview ? imgPreview : imageUri ? imageUri : ''}
              alt='Item Image'
              width={90}
              height={80}
            />
            <input
              type='file'
              accept='.svg, .png, .jpg, .jpeg'
              style={{ display: 'none' }}
              onChange={uploadImg}
            />
          </label>
          <div className={styles.idNameWrap}>
            <div className={styles.idWrap}>
              <label htmlFor='itemId' className={styles.bodyText}>
                아이템 ID :
              </label>
              <input
                id='itemId'
                className={styles.idBlank}
                value={itemId}
                readOnly
              />
            </div>
            <div className={styles.nameWrap}>
              <label htmlFor='itemName' className={styles.bodyText}>
                아이템명 :
              </label>
              <input
                id='itemName'
                className={styles.nameBlank}
                type='text'
                name='name'
                defaultValue={itemName}
                required
              />
            </div>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.mainContentWrap}>
              <label htmlFor='itemMainContent' className={styles.bodyText}>
                주설명 :
              </label>
              <input
                id='itemMainContent'
                className={styles.mainContentBlank}
                type='text'
                name='mainContent'
                defaultValue={mainContent}
                required
              />
            </div>
            <div className={styles.subContentWrap}>
              <label htmlFor='itemSubContent' className={styles.bodyText}>
                부설명 :
              </label>
              <textarea
                id='itemSubContent'
                className={styles.subContentBlank}
                name='subContent'
                defaultValue={subContent}
                required
              />
            </div>
          </div>
          <div className={styles.priceDiscountWrap}>
            <div className={styles.priceWrap}>
              <label htmlFor='itemOriginalPrice' className={styles.bodyText}>
                원가 :
              </label>
              <input
                id='itemOriginalPrice'
                className={styles.priceBlank}
                type='number'
                name='price'
                min='0'
                defaultValue={originalPrice}
                required
              />
            </div>
            <div className={styles.discountWrap}>
              <label htmlFor='itemDiscount' className={styles.bodyText}>
                할인율 :
              </label>
              <input
                id='itemDiscount'
                className={styles.discountBlank}
                type='number'
                name='discount'
                min='0'
                max='100'
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
