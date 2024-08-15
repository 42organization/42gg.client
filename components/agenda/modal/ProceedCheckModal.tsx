import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import styles from 'styles/agenda/modal.module.scss';

// interface ProceedCheckModalProps {
//   title?: string;
//   description: string;
//   // 체크할 필요가 있는 내용 있을 때 (예시:폼 제출시 값 확인)
//   contentsToCheck?: { [key: string]: string };
//   onProceed: () => void;
//   onCancel: () => void;
//   proceedText?: string;
//   cancelText?: string;
//   // 추가 버튼이 필요할 때
//   extraButtons?: { text: string; callback: (e: React.MouseEvent) => void }[];
// }

const ProceedCheckModal = () => {
  const [modalProps, setModalProps] = useRecoilState(agendaModalState);
  if (!modalProps) return null;
  // console.log('modalProps', modalProps);
  const {
    type,
    title,
    description,
    contentsToCheck,
    onProceed,
    onCancel,
    proceedText,
    cancelText,
    extraButtons,
  } = modalProps;

  const closeModal = () => {
    {
      onCancel && onCancel();
    }
    setModalProps(null);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        {title && (
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={styles.contentContainer}>
          <p>{description}</p>
          {contentsToCheck && (
            <div className={styles.contentsToCheckContainer}>
              {Object.keys(contentsToCheck).map((key, idx) => {
                if (!contentsToCheck || !contentsToCheck[key]) return null;
                return (
                  <div key={idx} className={styles.contentsToCheck}>
                    <p>{key}</p>
                    <p>{contentsToCheck[key]}</p>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button onClick={closeModal}>{cancelText || '취소'}</button>
            <button onClick={onProceed}>{proceedText || '확인'}</button>
          </div>
        </div>
      </div>
      {/* <div className={styles.modalBackground} onClick={onCancel} /> */}
    </>
  );
};

export default ProceedCheckModal;
