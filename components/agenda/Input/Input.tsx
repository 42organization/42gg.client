import { InputProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/Input.module.scss';

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
