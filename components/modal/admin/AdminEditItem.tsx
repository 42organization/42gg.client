import Image from 'next/image';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { IitemInfo } from 'types/admin/adminStoreTypes';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

export default function AdminEditItemModal(props: IitemInfo) {
  const { itemId, itemName, content, imageUrl, originalPrice, discount } =
    props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  // 수정 필요 작동안함
  //   const editItemHandler = async (id: number) => {
  //     try {
  //       await fetch(`http://localhost:3000/api/pingpong/admin/items/${id}`, {
  //         method: 'PUT',
  //         body: {
  //             name : String,
  //             content : String,
  //             imageUrl : String.
  //             price : integer,
  //             discont : integer,
  //             editor : String
  //         },
  //       });
  //       alert(`${id}번 아이템이 삭제되었습니다`);
  //     } catch (e: any) {
  //       if (e.response.status === 400) {
  //         alert(`${id}번 아이템을 삭제할 수 없습니다`);
  //       } else {
  //         setError('HJ10');
  //       }
  //     }
  //     resetModal();
  //   };

  return (
    <div>
      <div>
        <label htmlFor='itemName'>아이템명</label>
        <input type='text' value={itemName} />
      </div>
      <div>
        <label htmlFor='content'>아이템명</label>
        <input type='text' value={content} />
      </div>
      <div>
        <label htmlFor='imageUrl'>이미지</label>
        <input type='image' />
        <Image src={imageUrl} width={20} height={20} alt='no' />
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
      <button onClick={() => resetModal()}>취소</button>
      {/* <button onClick={() => editItemHandler(itemId)}>삭제</button> */}
    </div>
  );
}
