import React, { useEffect, useRef } from 'react';
import { groupColorTypes } from 'types/calendar/groupType';
import ColorButton from 'components/calendar/button/ColorButton';
import styles from 'styles/calendar/modal/GroupColorSelect.module.scss';

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
      {Object.entries(groupColorTypes).map(([key, value]) => (
        <ColorButton
          key={key}
          color={value}
          onClick={() => {
            handleEdit && handleEdit('color', id, value);
            setOpenDropdownId(0);
          }}
        />
      ))}
    </div>
  );
};

export default GroupColorSelect;
