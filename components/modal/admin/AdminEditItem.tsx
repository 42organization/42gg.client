import useUploadImg from 'hooks/useUploadImg';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IitemInfo } from 'types/admin/adminStoreTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminEditItem.module.scss';
import { userState } from 'utils/recoil/layout';
import { useRef } from 'react';

export default function AdminEditItemModal(props: IitemInfo) {
  const { itemId, itemName, content, imageUrl, originalPrice, discount } =
    props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const creator = useRecoilValue(userState).intraId;

  const { imgData, imgPreview, uploadImg } = useUploadImg();

  const nameRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();

  // api 연결 시 instanceInManage로 변경 필요
  const editItemHandler = async () => {
    const formData = new FormData();
    const data = {
      // name: ,
      // content: ,
      // price: ,
      // discount: ,
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
      const res = await mockInstance.put(`/admin/items/${itemId}`, formData);
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
              src={imgPreview ? imgPreview : imageUrl}
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
              />
            </div>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>설명 :</div>
            <input
              className={styles.contentBlank}
              type='text'
              name='content'
              defaultValue={content}
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
              />
            </div>
            <div className={styles.discountWrap}>
              <div className={styles.bodyText}>할인율 :</div>
              <input
                className={styles.discountBlank}
                type='number'
                name='discount'
                defaultValue={discount}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.editBtn}>수정</button>
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
