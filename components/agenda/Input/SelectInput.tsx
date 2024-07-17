import styles from 'styles/agenda/Input/SelectInput.module.scss';

interface SelectInputProps {
  data: string[];
  message?: string;
  selected?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({
  data,
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
      {...rest}
    >
      <option
        key={0}
        selected={selected ? false : true}
        className={styles.option}
      >
        {message ? message : '선택해주세요'}
      </option>
      {data.map((item: string, idx: number) => (
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
