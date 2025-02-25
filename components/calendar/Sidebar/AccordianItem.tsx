import { useState } from 'react';
import DownSVG from 'public/image/calendar/downToggle.svg';
import EditSVG from 'public/image/calendar/editIcon.svg';
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
  onCheckboxChange: (type: 'public' | 'private', id: string | number) => void;
  type: 'public' | 'private';
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  handleEdit?: (
    action: 'name' | 'color' | 'delete',
    id: string | number,
    value?: string
  ) => void;
}

const AccordianItem = ({
  title,
  checkboxData,
  onCheckboxChange,
  type,
  isEdit,
  setIsEdit,
  handleEdit,
}: AccordianItemProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className={styles.accordianMenu}>
        <DownSVG
          width={20}
          height={20}
          fill='#B4BDEE'
          onClick={() => setIsOpen(!isOpen)}
        />
        <p>{title}</p>
        {title === '개인 일정' && isOpen && (
          <EditSVG
            width={17}
            height={17}
            onClick={() => setIsEdit && setIsEdit(!isEdit)}
          />
        )}
      </div>
      {isOpen && (
        <div className={styles.accordianContent}>
          {checkboxData.map((checkbox) => (
            <CheckboxItem
              key={checkbox.id}
              checkboxData={checkbox}
              onChange={() => onCheckboxChange(type, checkbox.id)}
              isEdit={isEdit}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordianItem;
