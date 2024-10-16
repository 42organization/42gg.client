import { TabButtonProps } from 'types/agenda/button/tabButtonTypes';
import styles from 'styles/agenda/button/TabButton.module.scss';

export default function TabButton({ text, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`${styles.TabButton} ${isActive ? styles.isActive : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
