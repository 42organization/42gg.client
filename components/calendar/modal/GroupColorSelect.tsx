import React, { useEffect, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenDropdownId]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
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
