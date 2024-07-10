import Input from './Input';

interface CheckboxProps {
  name: string;
  label: string;
  discription?: string;
  checked?: boolean;
  rest?: Record<string, unknown> | undefined;
}

const CheckBoxInput = ({ name, label, ...rest }: CheckboxProps) => {
  return <Input name={name} label={label} type='checkbox' {...rest} />;
};

export default CheckBoxInput;
