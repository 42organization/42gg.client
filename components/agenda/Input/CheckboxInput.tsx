import { CheckboxProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/CheckboxInput.module.scss';
// import Input from './Input';

const CheckBoxInput = ({ name, label, options, ...rest }: CheckboxProps) => {
  return (
    <>
      {options && options.length > 0 ? (
        <div className={styles.checkboxContainer}>
          {options.map((option, idx) => (
            <>
              <label htmlFor={option}>{label}</label>
              <input
                {...rest}
                name={option}
                key={idx}
                type={'checkbox'}
                id={option}
                className={styles.checkBoxInput}
                checked={false}
              />
            </>
          ))}
        </div>
      ) : (
        <>
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
          <input
            name={name}
            type='checkbox'
            id={name}
            className={styles.checkbox}
            {...rest}
          />
        </>
      )}
    </>
  );
};

export default CheckBoxInput;
