import Image from 'next/image';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { IprofileInfo } from 'types/admin/adminReceiptType';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

export default function AdminDeleteProfileModal(props: IprofileInfo) {
  const { profileId, intraId, imageUrl } = props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  // 수정 필요 작동안함
  // 기존 유저 수정 api에서 가져오기
  //   const deleteProfilehandler = async () => {
  //     try {
  //       await fetch(`http://localhost:3000/api/pingpong/admin/`, {
  //         method: 'DELETE',
  //       });
  //     } catch (e: any) {
  //       if (e.response.status === 400) {
  //       } else {
  //         setError('HJ05');
  //       }
  //     }
  //     resetModal();
  //   };

  return (
    <div>
      <div>사용자 : {intraId}</div>
      <label>
        {imageUrl && <Image src={imageUrl} alt='Profile Image' fill={true} />}
      </label>
      <div>{profileId} 번 이미지를 삭제하시겠습니까?</div>

      <button onClick={() => resetModal()}>취소</button>
      {/* <button onClick={() => deleteProfileHandler()}>삭제</button> */}
    </div>
  );
}
