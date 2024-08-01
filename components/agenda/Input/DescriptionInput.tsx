import styles from 'styles/agenda/Input/DescriptionInput.module.scss';
import Input from './Input';

interface DescriptionProps {
  name: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DescriptionInput = ({
  name,
  label,
  placeholder,
  ...rest
}: DescriptionProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        type='description'
        id={name}
        className={styles.description_input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DescriptionInput;
