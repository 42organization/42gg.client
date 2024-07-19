import styles from 'styles/agenda/Input/CheckboxInput.module.scss';
// import Input from './Input';
interface CheckboxProps {
  name: string;
  label: string;
  options?: string[];
  discription?: string;
  checked?: boolean;
  rest?: Record<string, unknown> | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxInput = ({ name, label, options, ...rest }: CheckboxProps) => {
  return (
    <div className={styles.container}>
      {options && options.length > 0 ? (
        options.map((option, idx) => (
          <>
            <label htmlFor={option} className={styles.label}>
              {label}
            </label>
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
        ))
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
    </div>
  );
};

export default CheckBoxInput;
