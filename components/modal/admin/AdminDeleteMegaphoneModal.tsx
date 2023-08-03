import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

export default function AdminDeleteMegaphoneModal(megaphoneId: number) {
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  const deleteMegaphone = async (megaphoneId: number) => {
    try {
      await fetch(
        `http://localhost:3000/api/pingpong/admin/megaphones/${megaphoneId}`,
        {
          method: 'DELETE',
        }
      );
      alert(`${megaphoneId}번 확성기가 삭제되었습니다`);
    } catch (e: any) {
      if (e.response.status === 400) {
        alert(`${megaphoneId}번 확성기는 삭제할 수 없습니다`);
      } else {
        setError('HJ04');
      }
    }
  };

  return <div></div>;
}
