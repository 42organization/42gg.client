import styles from 'styles/agenda/button/SubmitInputButton.module.scss';

interface formButtonProps {
  name?: string;
  submit?: boolean;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rest?: Record<string, unknown> | undefined;
}

const FormBtn = ({
  name,
  label,
  submit,
  onClick,
  ...rest
}: formButtonProps) => {
  return (
    <button
      className={`${styles.inputBtn} ${styles.label}`}
      name={name}
      type={submit ? 'submit' : undefined}
      onClick={onClick ? onClick : undefined}
      {...rest}
    >
      {label}
    </button>
  );
};

export default FormBtn;
