import { SelectInputProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/SelectInput.module.scss';

const SelectInput = ({
  name,
  options,
  selected,
  label,
  onChange,
  ...rest
}: SelectInputProps) => {
  const isSelected = selected ? '' : styles.unselected;
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        className={`${styles.select} ${isSelected}`}
        onChange={onChange}
        name={name}
        {...rest}
      >
        {options.map((item: string, idx: number) => (
          <option
            key={idx}
            className={styles.option}
            selected={selected ? true : false}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
