import useUploadImg from 'hooks/useUploadImg';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminEditItem.module.scss';
import { userState } from 'utils/recoil/layout';
import { useRef } from 'react';
import { Item } from 'types/itemTypes';

export default function AdminEditItemModal(props: Item) {
  const { itemId, itemName, content, imageUri, originalPrice, discount } =
    props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const creator = useRecoilValue(userState).intraId;

  const { imgData, imgPreview, uploadImg } = useUploadImg();

  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);

  // api 연결 시 instanceInManage로 변경 필요
  const editItemHandler = async () => {
    const formData = new FormData();
    const data = {
      name: nameRef.current?.value,
      content: contentRef.current?.value,
      price: priceRef.current?.value,
      discount: discountRef.current?.value,
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
        message: '수정 완료',
        clicked: true,
      });
      setModal({ modalName: null });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'edit item',
        severity: 'error',
        message: `아이템 정보를 수정할 수 없습니다!`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>아이템 수정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
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
                ref={nameRef}
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
              ref={contentRef}
              defaultValue={content}
              required
            />
          </div>
          <div className={styles.priceDiscountWrap}>
            <div className={styles.priceWrap}>
              <div className={styles.bodyText}>원가 :</div>
              <input
                className={styles.priceBlank}
                type='number'
                ref={priceRef}
                defaultValue={originalPrice}
                required
              />
            </div>
            <div className={styles.discountWrap}>
              <div className={styles.bodyText}>할인율 :</div>
              <input
                className={styles.discountBlank}
                type='number'
                ref={discountRef}
                defaultValue={discount}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.editBtn} onClick={() => editItemHandler()}>
            수정
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
