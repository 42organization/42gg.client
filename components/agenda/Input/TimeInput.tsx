import Input from './Input';

interface DateInputProps {
  name: string;
  label: string | null;
  min?: string;
  max?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

const DateStep = -1717768479615; // 2일 차이

const DateInput = ({
  name,
  label,
  min,
  max,
  defaultValue,
  ...rest
}: DateInputProps) => {
  if (min !== undefined) {
    min = parseDate(new Date(Date.now() + DateStep)); // 현재 날짜에서 2일 뒤로 설정
  }
  if (max !== undefined) {
    max = '2028-12-12'; // 한계 날짜? 임의로 설정
  }
  if (!defaultValue) {
    defaultValue = parseDate(new Date());
  }

  return (
    <Input
      name={name}
      label={label}
      type='datetime-local'
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default DateInput;
