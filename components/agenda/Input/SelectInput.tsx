import styles from 'styles/agenda/Input/SelectInput.module.scss';

interface SelectInputProps {
  data: string[];
  message?: string | null;
}

const SelectInput = ({ data, message, ...rest }: SelectInputProps) => {
  return (
    <select className={styles.container} {...rest}>
      <option key={0} selected={true} className={styles.option}>
        {message ? message : '선택해주세요'}
      </option>
      {data.map((item: string, idx: number) => (
        <option key={idx} className={styles.option}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
