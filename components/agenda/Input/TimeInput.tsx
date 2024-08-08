import { DateInputProps } from 'types/aganda/InputPropTypes';
import { dateToString } from 'utils/handleTime';
import Input from './Input';
function parseTen(num: number, tenCount: number): string {
  return num < tenCount ? '0' + num : num.toString();
}

function parseDate(date: Date): string {
  return `${date.getFullYear()}-${parseTen(date.getMonth() + 1, 10)}-${parseTen(
    date.getDay() + 1,
    10
  )}T${parseTen(date.getHours() + 1, 10)}:${parseTen(
    date.getMinutes() + 1,
    10
  )}`;
}

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
    const date = new Date();
    date.setDate(date.getDate() + 1);
    min = parseDate(date); // 현재 날짜에서 2일 뒤로 설정
  }
  if (max !== undefined) {
    max = '2028-12-12'; // 한계 날짜? 임의로 설정
  }
  // if (defaultDate) console.log('defaultDate', dateToString(defaultDate));

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
