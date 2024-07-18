import styles from 'styles/agenda/Input/CheckboxInput.module.scss';
// import Input from './Input';
interface CheckboxProps {
  name: string;
  label: string;
  options?: string[];
  discription?: string;
  checked?: boolean;
  rest?: Record<string, unknown> | undefined;
}

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
