import { CheckboxProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/CheckboxInput.module.scss';

const CheckBoxInput = ({
  name,
  label,
  options,
  checked,
  ...rest
}: CheckboxProps) => {
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
              defaultChecked={false}
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
            defaultChecked={checked}
            className={styles.checkbox}
            {...rest}
          />
        </>
      )}
    </div>
  );
};

export default CheckBoxInput;
