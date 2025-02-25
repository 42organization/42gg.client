import ColorButton from 'components/calendar/button/ColorButton';
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
  id: number;
  setOpenDropdownId: (value: number) => void;
  handleEdit?: (action: 'color', id: number, value?: string) => void;
}

const GroupColorSelect = ({
  id,
  setOpenDropdownId,
  handleEdit,
}: GroupColorSelectProps) => {
  return (
    <div className={styles.dropdown}>
      {colorList.map((color) => (
        <ColorButton
          key={color}
          color={color}
          onClick={() => {
            handleEdit && handleEdit('color', id, color);
            setOpenDropdownId(0);
          }}
        />
      ))}
    </div>
  );
};

export default GroupColorSelect;
