import styles from 'styles/agenda/Input/Input.module.scss';

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  discription?: string;
  max?: number;
  min?: number;
  checked?: boolean; // 체크박스
  className?: string;
  rest?: Record<string, unknown> | undefined;
}

const Input = ({ name, label, type, ...rest }: InputProps) => {
  if (type === 'checkbox' && rest?.checked === true)
    return (
      <div className={styles.container}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <input
          {...rest}
          name={name}
          type={type}
          id={name}
          className={styles.input}
          checked
        />
      </div>
    );
  else
    return (
      <div className={styles.container}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <input
          {...rest}
          name={name}
          type={type}
          id={name}
          className={styles.input}
        />
      </div>
    );
};

export default Input;
