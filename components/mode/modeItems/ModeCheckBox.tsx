import styles from 'styles/mode/ModeCheckBox.module.scss';

interface ModeCheckBoxProps {
  id: string;
  checked: boolean;
  onCheckBox: () => void;
}

export default function ModeCheckBox({
  id,
  checked,
  onCheckBox,
}: ModeCheckBoxProps) {
  return (
    <div className={styles.checkBox}>
      <input
        type='checkbox'
        id={id}
        className={styles.box}
        checked={checked}
        onChange={onCheckBox}
      />
      <label htmlFor={id} className={styles.checking}>
        <span className={styles.checkBoxText}>42gg와 함께하기</span>
      </label>
    </div>
  );
}
