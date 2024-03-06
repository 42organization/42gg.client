// import { useSetRecoilState } from 'recoil';
// import { PartyReport } from 'types/modalTypes';
// import { instance } from 'utils/axios';
// import { modalState } from 'utils/recoil/modal';
// import { toastState } from 'utils/recoil/toast';
// import styles from 'styles/modal/party/PartyReportModal.module.scss';
// import { useRef } from 'react';

// export default function PartyCommentReportModal({ type, roomId }: PartyReport) {
//   const setModal = useSetRecoilState(modalState);
//   const setSnackBar = useSetRecoilState(toastState);
//   const contentRef = useRef<HTMLTextAreaElement>(null);

//   const setContent = (value: string) => {
//     if (contentRef.current) {
//       contentRef.current.value = value;
//     }
//   };

//   const sendReport = async () => {
//     const report = `신고자 intra ID : ${reporter.intraId}, 신고 대상 intra ID: ${reportee.intraId}
//     신고자 ID : ${reporter.userId}, 신고 대상 ID: ${reportee.userId}
//     신고 타입 : ${type}
//     신고 내용 : ${contentRef.current?.value}`;

//     try {
//       await instance.post(`/party/reports/rooms/${roomId}`, {
//         content: report,
//       });
//       setSnackBar({
//         toastName: 'noti user',
//         severity: 'success',
//         message: `신고가 정상적으로 전송되었습니다.`,
//         clicked: true,
//       });
//     } catch (e) {
//       setSnackBar({
//         toastName: 'noti user',
//         severity: 'error',
//         message: `API 요청에 문제가 발생했습니다.`,
//         clicked: true,
//       });
//     }
//     setModal({ modalName: null });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.title}>신고 사유</div>
//       <textarea
//         className={styles.textarea}
//         placeholder='신고 사유를 작성해주세요.'
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <div className={styles.buttonContainer}>
//         <button
//           className={styles.cancelButton}
//           onClick={() => setModal({ modalName: null })}
//         >
//           취소
//         </button>
//         <button className={styles.reportButton} onClick={sendReport}>
//           신고하기
//         </button>
//       </div>
//     </div>
//   );
// }
