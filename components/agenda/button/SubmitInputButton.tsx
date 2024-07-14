import styles from 'styles/agenda/button/SubmitInputButton.module.scss';

interface submitInputProps {
  name: string;
  label: string;
  discription?: string;
  rest?: Record<string, unknown> | undefined;
}

const SubmitInputBtn = ({ name, label, ...rest }: submitInputProps) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.inputBtn}
        name={name}
        type='submit'
        {...rest}
      ></input>
    </>
  );
};

export default SubmitInputBtn;
