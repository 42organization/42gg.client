import Input from './Input';

interface DateInputProps {
  name: string;
  label: string;
  min?: string;
  max?: string;
  value?: string;
  rest?: Record<string, unknown> | undefined;
}

function parseDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const DateStep = -1717768479615; // 2일 차이

const DateInput = ({
  name,
  label,
  min,
  max,
  value,
  ...rest
}: DateInputProps) => {
  if (min !== undefined) {
    min = parseDate(new Date(Date.now() + DateStep)); // 현재 날짜에서 2일 뒤로 설정
  }
  if (max !== undefined) {
    max = '2028-12-12'; // 한계 날짜? 임의로 설정
  }
  if (value !== undefined) {
    value = parseDate(new Date());
  }
  return <Input name={name} label={label} type='date' {...rest} />;
};

export default DateInput;
