import Input from './Input';

interface DescriptionProps {
  name: string;
  label: string;
  placeholder: string;
}

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
