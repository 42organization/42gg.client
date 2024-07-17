import styles from 'styles/agenda/button/TapButton.module.scss';

interface TapButtonProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

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
