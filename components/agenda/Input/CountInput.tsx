import Input from './Input';

interface CountInputProps {
  name: string;
  label: string;
  min: number;
  max: number;
  value?: number; // 초기값
  step?: number; // 숫자 사이 간격
  placeholder?: string;
  rest?: Record<string, unknown> | undefined;
}

const CountInput = ({ name, label, min, max, ...rest }: CountInputProps) => {
  return (
    <Input
      name={name}
      label={label}
      type='text'
      min={min}
      max={max}
      {...rest}
    />
  );
};

export default CountInput;
