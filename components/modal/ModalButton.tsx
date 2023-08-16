import styles from 'styles/modal/Modal.module.scss';

type ButtonProps = {
  style: 'positive' | 'negative';
  value: string;
  form?: string;
  onClick: () => void;
};

export function ModalButtonContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.modalButtonContainer}>{children}</div>;
}

export function ModalButton({ style, value, onClick, form }: ButtonProps) {
  return (
    <div className={styles[style]}>
      <input
        onClick={() => onClick()}
        type='button'
        value={value}
        form={form}
      />
    </div>
  );
}
