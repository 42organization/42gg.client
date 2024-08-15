import styles from 'styles/agenda/modal.module.scss';

interface ProceedCheckModalProps {
  title?: string;
  description: string;
  // 체크할 필요가 있는 내용 있을 때 (예시:폼 제출시 값 확인)
  contentsToCheck?: { [key: string]: string };
  onProceed: () => void;
  onCancel: () => void;
  proceedText?: string;
  cancelText?: string;
  // 추가 버튼이 필요할 때
  extraButtons?: { text: string; callback: (e: React.MouseEvent) => void }[];
}

const ProceedCheckModal = (props: ProceedCheckModalProps) => {
  return (
    <>
      <div className={styles.modalContainer}>
        {props.title && (
          <div className={styles.titleContainer}>
            <h1>{props.title}</h1>
          </div>
        )}
        <div className={styles.contentContainer}>
          <p>{props.description}</p>
          {props.contentsToCheck && (
            <div className={styles.contentsToCheckContainer}>
              {Object.keys(props.contentsToCheck).map((key, idx) => {
                if (!props.contentsToCheck || !props.contentsToCheck[key])
                  return null;
                return (
                  <div key={idx} className={styles.contentsToCheck}>
                    <p>{key}</p>
                    <p>{props.contentsToCheck[key]}</p>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button onClick={props.onCancel}>
              {props.cancelText || '취소'}
            </button>
            <button onClick={props.onProceed}>
              {props.proceedText || '확인'}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={props.onCancel} />
    </>
  );
};

export default ProceedCheckModal;
