import Input from './Input';

interface ImageProps {
  name: string;
  label: string;
  discription?: string;
  rest?: Record<string, unknown> | undefined;
}

const ImageInput = ({ name, label, ...rest }: ImageProps) => {
  return <Input name={name} label={label} type='file' {...rest} />;
};

export default ImageInput;
