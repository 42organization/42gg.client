import styles from 'styles/mode/ModeCheckBox.module.scss';

interface ModeCheckBoxProps {
  id: string;
  // text: string;
  checked: boolean;
  onToggle: () => void;
}

export default function ModeCheckBox({
  id,
  // text,
  checked,
  onToggle,
}: ModeCheckBoxProps) {
  return (
    <div className={styles.checkBox}>
      <input
        type='checkbox'
        id={id}
        className={styles.check}
        checked={checked}
        onChange={onToggle}
      />
      <label htmlFor={id} className={styles.checking}>
        <span className={styles.checkBoxText}>42gg와 함께하기</span>
        {/* <span className={styles.toggleButton}></span> */}
      </label>
    </div>
  );
}
