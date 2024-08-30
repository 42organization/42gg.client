import { CountInputProps } from 'types/aganda/InputPropTypes';
import Input from './Input';

const CountInput = ({ name, label, min, max, ...rest }: CountInputProps) => {
  return (
    <Input
      name={name}
      label={label}
      type='number'
      min={min}
      max={max}
      {...rest}
    />
  );
};

export default CountInput;
