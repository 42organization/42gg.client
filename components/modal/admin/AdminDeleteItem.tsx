import Image from 'next/image';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

export default function AdminDeleteItemModal(props: Item) {
  const { itemId, itemName, content, imageUri } = props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  // 수정 필요 작동안함
  // instanceInManage, try catch로 변경
  const deleteItemHandler = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/pingpong/admin/items/${id}`, {
        method: 'DELETE',
      });
      alert(`${id}번 아이템이 삭제되었습니다`);
    } catch (e: any) {
      if (e.response.status === 400) {
        alert(`${id}번 아이템을 삭제할 수 없습니다`);
      } else {
        setError('HJ11');
      }
    }
    resetModal();
  };

  return (
    <div>
      <div>
        아이템명 : {itemName}
        설명 : {content}
      </div>
      <Image src={imageUri} width={20} height={20} alt='no' />
      <div>{itemId} 번 아이템을 삭제하시겠습니까?</div>
      <button onClick={() => resetModal()}>취소</button>
      {/* <button onClick={() => deleteItemHandler(itemId)}>삭제</button> */}
    </div>
  );
}
