import styles from 'styles/agenda/Input/Input.module.scss';

interface InputProps {
  name: string;
  label: string | null;
  type: string;
  placeholder?: string;
  discription?: string;
  defaultValue?: string;
  max?: number;
  min?: number;
  checked?: boolean; // 체크박스
  className?: string;
  rest?: Record<string, unknown> | undefined;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, label, type, ...rest }: InputProps) => {
  return (
    <div className={` ${styles.container} + ${rest?.className}`}>
      {label ? (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      ) : null}
      {type === 'checkbox' ? (
        <>
          <input
            {...rest}
            name={name}
            type={type}
            id={name}
            className={styles.checkBoxInput}
            checked={rest?.checked}
          />
          <label htmlFor={name}></label>
        </>
      ) : (
        <input
          {...rest}
          name={name}
          type={type}
          id={name}
          className={styles.input}
        />
      )}
    </div>
  );
};

export default Input;
