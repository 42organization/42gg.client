import { DescriptionProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/DescriptionInput.module.scss';
// import Input from './Input';

const DescriptionInput = ({
  name,
  label,
  placeholder,
  defaultValue,
  ...rest
}: DescriptionProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        {...rest}
        name={name}
        // type='description'
        id={name}
        className={styles.description_input}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default DescriptionInput;
