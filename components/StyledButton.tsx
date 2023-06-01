import { MouseEventHandler } from 'react';
import styles from 'styles/StyledButton.module.scss';

type StyledButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function StyledButton({ onClick, children }: StyledButtonProps) {
  return (
    <div className={styles.background}>
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
