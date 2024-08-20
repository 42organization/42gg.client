import { TitleInputProps } from 'types/aganda/InputPropTypes';
import Input from './Input';

const TitleInput = ({
  name,
  label,
  defaultValue,
  ...rest
}: TitleInputProps) => {
  return (
    <Input
      name={name}
      label={label}
      type='text'
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default TitleInput;
