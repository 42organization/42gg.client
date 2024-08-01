import Input from './Input';

interface TitleInputProps {
  name: string;
  label: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rest?: Record<string, unknown> | undefined;
}

const TitleInput = ({ name, label, ...rest }: TitleInputProps) => {
  return <Input name={name} label={label} type='text' {...rest} />;
};

export default TitleInput;
