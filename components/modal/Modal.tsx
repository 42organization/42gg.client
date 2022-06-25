import styles from '../../styles/Layout/Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
}
