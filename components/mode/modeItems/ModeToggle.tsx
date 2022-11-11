import styles from 'styles/mode/ModeToggle.module.scss';

interface ModeToggleProps {
  checked: boolean;
  text: string;
  onToggle: () => void;
  id: string;
}

export default function ModeToggle({
  checked,
  text,
  onToggle,
  id,
}: ModeToggleProps) {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={styles.toggle}
        checked={checked}
        onChange={onToggle}
        hidden
      />
      <label htmlFor={id} className={styles.toggleSwitch}>
        <span className={styles.toggleText}>{text}</span>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
}
