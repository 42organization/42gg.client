import styles from 'styles/calendar/modal/GroupColorSelect.module.scss';

const colorList = [
  '#9C57BC',
  '#7DC163',
  '#E6634F',
  '#FFDD47',
  '#FFA646',
  '#357BE5',
];

interface GroupColorSelectProps {
  openDropdownId: number;
  setOpenDropdownId: (value: number) => void;
}

const GroupColorSelect = ({
  openDropdownId,
  setOpenDropdownId,
}: GroupColorSelectProps) => {
  return (
    <div className={styles.dropdown}>
      {colorList.map((color) => (
        <div
          key={color}
          className={styles.color}
          style={{ backgroundColor: color }}
          onClick={() => {
            setOpenDropdownId(0);
          }}
        ></div>
      ))}
    </div>
  );
};

export default GroupColorSelect;
