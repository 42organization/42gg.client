import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { ImegaphoneInfo } from 'types/admin/adminReceiptType';

export default function AdminDeleteMegaphoneModal(props: ImegaphoneInfo) {
  const { megaphoneId, content, intraId } = props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  const deleteMegaphonehandler = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/pingpong/admin/megaphones/${id}`, {
        method: 'DELETE',
      });
      alert(`${id}번 확성기가 삭제되었습니다`);
    } catch (e: any) {
      if (e.response.status === 400) {
        alert(`${id}번 확성기는 삭제할 수 없습니다`);
      } else {
        setError('HJ04');
      }
    }
    resetModal();
  };

  return (
    <div>
      <div>
        사용자 : {intraId}
        확성기 내용 : {content}
      </div>
      <div>{megaphoneId} 번 확성기를 삭제하시겠습니까?</div>

      <button onClick={() => resetModal()}>취소</button>
      <button onClick={() => deleteMegaphonehandler(megaphoneId)}>삭제</button>
    </div>
  );
}
