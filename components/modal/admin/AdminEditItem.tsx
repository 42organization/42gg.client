import useUploadImg from 'hooks/useUploadImg';
import Image from 'next/image';
import { useCallback } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { IitemInfo } from 'types/admin/adminStoreTypes';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';

export default function AdminEditItemModal(props: IitemInfo) {
  const { itemId, itemName, content, imageUrl, originalPrice, discount } =
    props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const { imgData, imgPreview, uploadImg } = useUploadImg();

  // api 연결 시 instanceInManage로 변경 필요
  const editItemHandler = async () => {
    const formData = new FormData();
    const data = {
      // name: ,
      // content: ,
      // price: ,
      // discount: ,
      // creatorIntra: ,
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
    <div className={Styles.modal}>
      <div>
        <label htmlFor='imageUrl'>이미지</label>
        <input type='image' />
        <Image src={imageUrl} width={20} height={20} alt='no' />
      </div>
      <div>
        <label htmlFor='itemName'>아이템명</label>
        <input type='text' value={itemName} />
      </div>
      <div>
        <label htmlFor='content'>아이템명</label>
        <input type='text' value={content} />
      </div>
      <div>
        <label htmlFor='price'>가격</label>
        <input type='number' value={originalPrice} />
      </div>
      <div>
        <label htmlFor='discount'>할인율</label>
        <input type='number' value={discount} />
      </div>
      <div>{itemId} 번 아이템을 수정하시겠습니까?</div>
      <button onClick={() => setModal({ modalName: null })}>취소</button>
      {/* <button onClick={() => editItemHandler(itemId)}>삭제</button> */}
    </div>
  );
}
