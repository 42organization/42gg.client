import styles from 'styles/mode/ModeToggle.module.scss';

interface ModeToggleProps {
  checked: boolean;
  onToggle: () => void;
  text: string;
}

export default function ModeToggle({
  checked,
  onToggle,
  text,
}: ModeToggleProps) {
  return (
    <div>
      <input
        type='checkbox'
        id='toggle'
        className={styles.toggle}
        checked={checked}
        onChange={onToggle}
        hidden
      />
      <label htmlFor='toggle' className={styles.toggleSwitch}>
        <span className={styles.toggleText}>{text}</span>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
}
