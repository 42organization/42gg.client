import { InputProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/Input.module.scss';

const Input = ({ name, label, type, ...rest }: InputProps) => {
  return (
    <div className={` ${styles.container} + ${rest?.className}`}>
      <div style={{ display: 'flex' }}>
        {label ? (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        ) : null}
        {rest?.error ? (
          <p className={`error_text ${styles.error}`}>{rest.error}</p>
        ) : null}
      </div>
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
