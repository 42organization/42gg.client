interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  discription?: string;
  max?: number;
  min?: number;
  checked?: boolean; // 체크박스
  rest?: Record<string, unknown> | undefined;
}

const Input = ({ name, label, type, ...rest }: InputProps) => {
  if (type === 'checkbox' && rest?.checked === true)
    return (
      <div className=''>
        <label htmlFor={name}>{label}</label>
        <input
          {...rest}
          name={name}
          type={type}
          id={name}
          className='form-control'
          checked
        />
      </div>
    );
  else
    return (
      <div className=''>
        <label htmlFor={name}>{label}</label>
        <input
          {...rest}
          name={name}
          type={type}
          id={name}
          className='form-control'
        />
      </div>
    );
};

export default Input;
