import styles from 'styles/calendar/modal/GroupColorSelect.module.scss';
import ColorButton from '../button/ColorButton';

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
        <ColorButton
          key={color}
          color={color}
          onClick={() => setOpenDropdownId(0)}
        />
      ))}
    </div>
  );
};

export default GroupColorSelect;
