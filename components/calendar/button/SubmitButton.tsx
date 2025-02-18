import styles from 'styles/calendar/button/SubmitButton.module.scss';

interface SumbitBtnProps {
  type: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SumbitButton = ({ type, label, onClick }: SumbitBtnProps) => {
  return (
    <button className={styles[type]} onClick={onClick}>
      {label}
    </button>
  );
};

export default SumbitButton;
