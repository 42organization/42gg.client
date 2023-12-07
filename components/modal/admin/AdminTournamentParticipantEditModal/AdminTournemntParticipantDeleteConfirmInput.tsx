import { Dispatch, SetStateAction } from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface AdminTournamentParticipantDeleteConfirmInputProps {
  isSame: boolean;
  intraId: string;
  userId: number;
  setIsSame: Dispatch<SetStateAction<Record<number, boolean>>>;
}

export default function AdminTournamentParticipantDeleteConfirmInput({
  isSame,
  intraId,
  userId,
  setIsSame,
}: AdminTournamentParticipantDeleteConfirmInputProps) {
  function inputChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.target.value === intraId) {
      setIsSame({ [userId]: true });
    } else {
      setIsSame({ [userId]: false });
    }
  }

  return (
    <TextField
      size='small'
      variant='outlined'
      error={isSame ? false : true}
      color={isSame ? 'success' : 'warning'}
      placeholder={intraId}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>{intraId}</InputAdornment>
        ),
      }}
      onChange={inputChangeHandler}
    />
  );
}
