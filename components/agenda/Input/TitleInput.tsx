import { TitleInputProps } from 'types/aganda/InputPropTypes';
import Input from './Input';

const TitleInput = ({ name, label, ...rest }: TitleInputProps) => {
  return <Input name={name} label={label} type='text' {...rest} />;
};

export default TitleInput;
