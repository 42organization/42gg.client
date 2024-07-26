import { useRef, useState } from 'react';
import { SelectInputProps } from 'types/aganda/InputPropTypes';
import styles from 'styles/agenda/Input/SelectInput.module.scss';

const SelectInput = ({
  name,
  options,
  selected,
  message,
  label,
  onChange,
  ...rest
}: SelectInputProps) => {
  const [isSelected, setIsSelected] = useState<string>(
    selected && selected != message ? styles.selected : styles.unselected
  );
  const selectedValueRef = useRef<string>(selected ? selected : '');

  message = message ? message : '선택해주세요';
  selected = selected ? selected : message;

  function changeState(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === selectedValueRef.current) {
      // 이전 값과 같을 경우
      return isSelected === styles.selected ? true : false;
    }
    selectedValueRef.current = e.target.value;
    if (selectedValueRef.current === message) {
      // 선택값이 선택하지 않은 값일 경우
      setIsSelected(styles.unselected);
      return false;
    } else {
      setIsSelected(styles.selected);
      return true;
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        className={`${styles.select} ${isSelected}`}
        onChange={(e) => {
          const selected = changeState(e);
          if (onChange) onChange(e, selected);
        }}
        name={name}
        {...rest}
      >
        <option
          key={0}
          selected={selected === message ? true : false}
          className={styles.option}
        >
          {message}
        </option>
        {options.map((item: string, idx: number) => (
          <option
            key={idx}
            className={styles.option}
            selected={selected === item ? true : false}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
