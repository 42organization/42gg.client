import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AgendaListProps } from 'types/agenda/agendaDetail/agendaTypes';

interface AgendaSelectProps {
  selectedKey: string;
  dataList: any;
  handleSelectChange: (event: { target: { value: any } }) => void;
}

const AgendaSelect = ({
  selectedKey,
  dataList,
  handleSelectChange,
}: AgendaSelectProps) => {
  return (
    <Select value={selectedKey} onChange={handleSelectChange} displayEmpty>
      <MenuItem value='' disabled>
        Choose an agenda...
      </MenuItem>
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
