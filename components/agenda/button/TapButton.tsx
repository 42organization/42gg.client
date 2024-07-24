import { TapButtonProps } from 'types/agenda/button/tapButtonTypes';
import styles from 'styles/agenda/button/TapButton.module.scss';

export default function TapButton({ text, isActive, onClick }: TapButtonProps) {
  return (
    <button
      className={`${styles.TapButton} ${isActive ? styles.isActive : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
