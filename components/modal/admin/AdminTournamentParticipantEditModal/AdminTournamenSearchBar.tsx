import { RefObject } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Input, InputAdornment } from '@mui/material';

interface AdminTournamenSearchBarProps {
  inputRef: RefObject<HTMLInputElement>;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isIdExist: boolean;
  inputId: string;
  isTyping: boolean;
}

export default function AdminTournamentSearchBar({
  inputRef,
  inputChangeHandler,
  isIdExist,
  inputId,
  isTyping,
}: AdminTournamenSearchBarProps) {
  return (
    <Input
      ref={inputRef}
      onChange={inputChangeHandler}
      placeholder='인트라 ID를 입력하세요.'
      error={!isIdExist}
      value={inputId}
      endAdornment={
        inputId &&
        !isTyping && (
          <InputAdornment position='end'>
            {isIdExist ? (
              <CheckCircleOutlineIcon style={{ color: 'green' }} />
            ) : (
              <CancelOutlinedIcon style={{ color: 'red' }} />
            )}
          </InputAdornment>
        )
      }
    />
  );
}
