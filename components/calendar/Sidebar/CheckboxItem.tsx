import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel } from '@mui/material';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import GroupColorSelect from '../modal/GroupColorSelect';

interface CheckboxData {
  id: number | string;
  name: string;
  color: string;
  checked: boolean;
}

interface CheckboxItemProps {
  checkboxData: CheckboxData;
  onChange: () => void;
  isEdit?: boolean;
  handleEdit?: (
    action: 'name' | 'color' | 'delete',
    id: string | number,
    value?: string
  ) => void;
}

const CheckboxItem = ({
  checkboxData: { id, name, color, checked },
  onChange,
  isEdit,
  handleEdit,
}: CheckboxItemProps) => {
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(color);
  const [openDropdownId, setOpenDropdownId] = useState<number>(0);

  useEffect(() => {
    setNewName(name);
    setNewColor(color);
  }, [name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleChangeSave = (action: 'name' | 'color' | 'delete') => {
    if (action === 'name') {
      handleEdit && handleEdit('name', id, newName);
    } else if (action === 'color') {
      handleEdit && handleEdit('color', id, newColor);
    }
  };

  return (
    <div className={styles.accordianField}>
      <FormControlLabel
        control={
          <Checkbox
            size='small'
            checked={checked}
            onChange={(e) => {
              if (isEdit) {
                e.preventDefault();
              } else {
                onChange();
              }
            }}
            onClick={
              isEdit
                ? () => setOpenDropdownId(typeof id === 'number' ? id : 0)
                : undefined
            }
            sx={{
              color: color,
              '&.Mui-checked': { color: color },
            }}
          />
        }
        label={
          isEdit ? (
            <input
              type='text'
              value={newName}
              onChange={handleNameChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleChangeSave('name');
                  e.currentTarget.blur();
                }
              }}
              onBlur={() => handleChangeSave('name')}
              className={styles.groupField}
            />
          ) : (
            <span>{name}</span>
          )
        }
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            margin: 0,
            color: 'inherit',
          },
        }}
      />
      {openDropdownId === id && (
        <GroupColorSelect
          id={id}
          setOpenDropdownId={setOpenDropdownId}
          handleEdit={handleEdit}
        />
      )}
      {isEdit && (
        <DeleteIcon
          style={{ width: 20, height: 20, right: 0, color: '#B4BDEE' }}
          onClick={() => handleEdit && handleEdit('delete', id)}
        />
      )}
    </div>
  );
};

export default CheckboxItem;
