import styles from 'styles/agenda/Input/SelectInput.module.scss';

interface SelectInputProps {
  name: string;
  label?: string;
  options: string[];
  message?: string;
  selected?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({
  name,
  options,
  message,
  selected,
  onChange,
  ...rest
}: SelectInputProps) => {
  const isSelected = selected ? '' : styles.unselected;
  return (
    <select
      className={`${styles.container} ${isSelected}`}
      onChange={onChange}
      name={name}
      {...rest}
    >
      <option
        key={0}
        selected={selected ? false : true}
        className={styles.option}
      >
        {message ? message : '선택해주세요'}
      </option>
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
  );
};

export default SelectInput;
