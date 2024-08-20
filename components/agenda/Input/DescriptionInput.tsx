import { DescriptionProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/DescriptionInput.module.scss';

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
        name={name}
        id={name}
        className={styles.description_input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DescriptionInput;
