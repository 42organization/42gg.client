import { ImageProps } from 'types/aganda/InputPropTypes';
import Input from './Input';

const ImageInput = ({ name, label, ...rest }: ImageProps) => {
  return <Input name={name} label={label} type='file' {...rest} />;
};

export default ImageInput;
