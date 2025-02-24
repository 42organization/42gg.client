import styles from 'styles/calendar/button/ColorButton.module.scss';

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

const ColorButton = ({ color, onClick }: ColorButtonProps) => (
  <div
    className={styles.colorButton}
    style={{ backgroundColor: color }}
    onClick={onClick}
  />
);

export default ColorButton;
