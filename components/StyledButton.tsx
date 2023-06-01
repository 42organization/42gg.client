import { MouseEventHandler } from 'react';
import styles from 'styles/StyledButton.module.scss';

type StyledButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  width: string;
};

export default function StyledButton({
  onClick,
  children,
  width,
}: StyledButtonProps) {
  const buttonStyle = {
    width: width || 'auto',
  };
  return (
    <div className={styles.background}>
      <button className={styles.button} onClick={onClick} style={buttonStyle}>
        {children}
      </button>
    </div>
  );
}
