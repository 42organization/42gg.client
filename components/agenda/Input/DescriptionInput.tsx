import { DescriptionProps } from 'types/aganda/InputPropTypes';
import Input from './Input';

const DescriptionInput = ({
  name,
  label,
  placeholder,
  ...rest
}: DescriptionProps) => {
  return (
    <Input
      name={name}
      label={label}
      type='Description'
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default DescriptionInput;
