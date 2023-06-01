import { MouseEventHandler } from 'react';
import styles from 'styles/StyledButton.module.scss';

type StyledButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  width?: string;
};

export default function StyledButton({
  onClick,
  children,
  width,
}: StyledButtonProps) {
  const buttonWidth = {
    width: width || 'auto',
  };
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.container} style={buttonWidth}>
        {children}
      </div>
    </button>
  );
}
