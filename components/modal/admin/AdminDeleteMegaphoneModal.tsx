import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { ImegaphoneInfo } from 'types/admin/adminReceiptType';
import styles from 'styles/admin/modal/AdminDeleteMegaphoneModal.module.scss';

export default function AdminDeleteMegaphoneModal(props: ImegaphoneInfo) {
  const { megaphoneId, content, intraId } = props;
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);

  // 수정 필요 작동안함
  // instanceInManage, try catch로 변경
  // const deleteMegaphoneHandler = async (id: number) => {
  //   try {
  //     await fetch(`http://localhost:3000/api/pingpong/admin/megaphones/${id}`, {
  //       method: 'DELETE',
  //     });
  //     alert(`${id}번 확성기가 삭제되었습니다`);
  //   } catch (e: any) {
  //     if (e.response.status === 400) {
  //       alert(`${id}번 확성기는 삭제할 수 없습니다`);
  //     } else {
  //       setError('HJ04');
  //     }
  //   }
  //   resetModal();
  // };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>확성기 삭제</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>사용자 :</div>
            <input className={styles.intraBlank} value={intraId} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>확성기 내용 :</div>
            <input
              className={styles.contentBlank}
              name='content'
              value={content}
              readOnly
            />
          </div>
          <div className={styles.checkWrap}>
            {megaphoneId} 번 확성기를 삭제하시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.cancelBtn} onClick={() => resetModal()}>
            취소
          </button>
          <button className={styles.deleteBtn}>삭제</button>
        </div>
      </div>
    </div>
  );
}
