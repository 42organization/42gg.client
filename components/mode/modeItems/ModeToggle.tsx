import styles from 'styles/mode/ModeToggle.module.scss';

interface ModeToggleProps {
  id: string;
  text: string;
  checked: boolean;
  onToggle: () => void;
}

export default function ModeToggle({
  id,
  text,
  checked,
  onToggle,
}: ModeToggleProps) {
  return (
    <div>
      <input
        type='checkbox'
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
