import { useState } from 'react';
import DownSVG from 'public/image/calendar/downToggle.svg';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import CheckboxItem from './CheckboxItem';

interface CheckboxData {
  id: number | string;
  name: string;
  color: string;
  checked: boolean;
}

interface AccordianItemProps {
  title: string;
  checkboxData: CheckboxData[];
  checkboxChange: (type: 'public' | 'private', id: string | number) => void;
  type: 'public' | 'private';
}

const AccordianItem = ({
  title,
  checkboxData,
  checkboxChange,
  type,
}: AccordianItemProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className={styles.accordianMenu} onClick={() => setIsOpen(!isOpen)}>
        <DownSVG width={20} height={20} fill='#B4BDEE' />
        <p>{title}</p>
      </div>
      {isOpen && (
        <div className={styles.accordianContent}>
          {checkboxData.map((checkbox) => (
            <CheckboxItem
              key={checkbox.id}
              name={checkbox.name}
              color={checkbox.color}
              checked={checkbox.checked}
              onChange={() => checkboxChange(type, checkbox.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordianItem;
