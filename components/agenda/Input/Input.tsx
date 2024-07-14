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
  return (
    <div className={` ${styles.container} + ${rest?.className}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
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
