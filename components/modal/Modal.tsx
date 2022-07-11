import styles from 'styles/modal/Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const modalCloseHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      document.body.style.overflow = 'unset';
    }
  };
  return (
    <div
      className={styles.backdrop}
      id='modalOutside'
      onClick={modalCloseHandler}
    >
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
}
