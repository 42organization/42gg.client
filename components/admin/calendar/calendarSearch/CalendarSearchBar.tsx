import { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import {
  Box,
  Select,
  MenuItem,
  Button,
  FormControl,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import styles from 'styles/admin/calendar/CalendarSearchBar.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchData } from './CalendarSearchResults';

interface CalendarSearchBarProps {
  onSearch: (data: SearchData) => void;
}

export const CalendarSearchBar = ({ onSearch }: CalendarSearchBarProps) => {
  const [typeOption, setTypeOption] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleTypeOtionChange = useCallback(
    (e: SelectChangeEvent) => setTypeOption(e.target.value as string),
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value),
    []
  );

  const handleStartTimeChange = useCallback(
    (date: Date | null) => setStartTime(date),
    []
  );

  const handleEndTimeChange = useCallback(
    (date: Date | null) => setEndTime(date),
    []
  );

  const handleSearchClick = () => {
    onSearch({ typeOption: typeOption, content, startTime, endTime });
  };

  return (
    <Box className={styles.searchBar}>
      {/* Type Select */}
      <FormControl sx={{ width: 100 }}>
        <Select
          labelId='type-select-label'
          value={typeOption}
          onChange={handleTypeOtionChange}
          displayEmpty
          sx={{
            fontSize: '14px',
          }}
        >
          <MenuItem value='' disabled sx={{ fontSize: '14px' }}>
            검색 기준
          </MenuItem>
          <MenuItem value='title' sx={{ fontSize: '14px' }}>
            제목
          </MenuItem>
          <MenuItem value='author' sx={{ fontSize: '14px' }}>
            작성자
          </MenuItem>
          <MenuItem value='content' sx={{ fontSize: '14px' }}>
            내용
          </MenuItem>
          <MenuItem value='classification' sx={{ fontSize: '14px' }}>
            분류
          </MenuItem>
        </Select>
      </FormControl>
      {/* Content */}
      <TextField
        value={typeOption ? content : ''}
        onChange={handleContentChange}
        error={!typeOption}
        label={typeOption ? '검색 내용' : '검색 기준을 먼저 선택해주세요.'}
        variant='outlined'
        disabled={!typeOption}
        sx={{
          width: 400,
          fontSize: '14px',
        }}
        InputProps={{
          style: {
            fontSize: '14px',
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: '14px',
          },
        }}
      />
      {/* Date */}
      <div className={styles.dateContainer}>
        <DatePicker
          selected={startTime}
          onChange={handleStartTimeChange}
          dateFormat='yyyy-MM-dd'
          placeholderText='YYYY-MM-DD'
          maxDate={endTime}
          className={styles.dateInput}
        />
        <div>~</div>
        <DatePicker
          selected={endTime}
          onChange={handleEndTimeChange}
          dateFormat='yyyy-MM-dd'
          placeholderText='YYYY-MM-DD'
          minDate={startTime}
          className={styles.dateInput}
        />
      </div>
      {/* Button */}
      <Button
        sx={{
          backgroundColor: '#be8df2',
          color: '#fff',
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#a871de',
          },
        }}
        onClick={handleSearchClick}
      >
        검색
      </Button>
    </Box>
  );
};
