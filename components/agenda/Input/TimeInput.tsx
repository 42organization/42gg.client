import { DateInputProps } from 'types/aganda/InputPropTypes';
import { dateToInputFormat, dateToString } from 'utils/handleTime';
import Input from './Input';

const DateInput = ({
  name,
  label,
  min,
  max,
  defaultValue,
  defaultDate,
  ...rest
}: DateInputProps) => {
  if (min !== undefined) {
    min = dateToInputFormat(new Date()); // 지금 시간으로 설정
  }
  if (max !== undefined) {
    max = '2028-12-12'; // 한계 날짜? 임의로 설정
  }

  return (
    <Input
      name={name}
      label={label}
      type='datetime-local'
      defaultValue={dateToString(defaultDate || new Date())}
      {...rest}
    />
  );
};

export default DateInput;
