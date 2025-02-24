import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxItemProps {
  name: string;
  color: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem = ({
  name,
  color,
  checked,
  onChange,
}: CheckboxItemProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          size='small'
          defaultChecked={checked}
          onChange={onChange}
          sx={{ color: color, '&.Mui-checked': { color: color } }}
        />
      }
      label={name}
      sx={{
        '& .MuiFormControlLabel-label': {
          color: color,
          fontSize: '14px',
          margin: 0,
        },
      }}
    />
  );
};

export default CheckboxItem;
