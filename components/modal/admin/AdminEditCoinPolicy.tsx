import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { IcoinPolicy } from 'types/admin/adminCoinTypes';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

export default function AdminEditCoinPolicyModal(props: IcoinPolicy) {
  const { attendance, normal, rankWin, rankLose } = props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  // 수정 필요 작동안함
  //   const editCoinPolicyHandler = async () => {
  //     try {
  //       await fetch(`http://localhost:3000/api/pingpong/admin/coinpolicy`, {
  //         method: 'POST',
  //         body: {
  // attendance: Number,
  // normal: Number,
  // rankWin: Number,
  // rankLose: Number,
  //         },
  //       });
  //       alert(`새로운 코인 정책이 등록되었습니다.`);
  //     } catch (e: any) {
  //       if (e.response.status === 400) {
  //         alert(`새로운 코인 정책을 등록할 수 없습니다`);
  //       } else {
  //         setError('HJ12');
  //       }
  //     }
  //     resetModal();
  //   };

  return (
    <div>
      <div>
        {attendance}
        {normal}
        {rankWin}
        {rankLose}
      </div>
      <div>새로운 코인 정책을 등록하시겠습니까?</div>
      <button onClick={() => resetModal()}>취소</button>
      {/* <button onClick={() => editCoinPolicyHandler}>삭제</button> */}
    </div>
  );
}
