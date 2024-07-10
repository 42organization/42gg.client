import styles from 'styles/agenda/Input/CheckboxInput.module.scss';
import Input from './Input';
interface CheckboxProps {
  name: string;
  label: string;
  discription?: string;
  checked?: boolean;
  rest?: Record<string, unknown> | undefined;
}

const CheckBoxInput = ({ name, label, ...rest }: CheckboxProps) => {
  return (
    <Input
      name={name}
      label={label}
      type='checkbox'
      className={styles.checkbox}
      {...rest}
    />
  );
};

export default CheckBoxInput;
