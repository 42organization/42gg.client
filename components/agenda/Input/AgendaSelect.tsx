import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface AgendaSelectProps {
  selectedKey: string;
  dataList: any;
  handleSelectChange: (event: { target: { value: any } }) => void;
  defaultSelect?: string;
}

const AgendaSelect = ({
  selectedKey,
  dataList,
  handleSelectChange,
  defaultSelect = 'Choose an agenda...',
}: AgendaSelectProps) => {
  return (
    <Select value={selectedKey} onChange={handleSelectChange} displayEmpty>
      <MenuItem value=''>{defaultSelect}</MenuItem>
      {Array.isArray(dataList) &&
        dataList.map((agenda) => (
          <MenuItem key={agenda.agendaKey} value={agenda.agendaKey}>
            {agenda.agendaTitle}
          </MenuItem>
        ))}
    </Select>
  );
};

export default AgendaSelect;
