import styles from 'styles/calendar/button/ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
  return (
    <div>
      <label className={styles.switch}>
        <input type='checkbox' checked={checked} onChange={onChange} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};
export default ToggleSwitch;
