import styles from 'styles/modal/AfterGameModal.module.scss';

interface ButtonsProps {
  onCheck: boolean;
  onEnter: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

export function Buttons({ onCheck, onEnter, onReset, onSubmit }: ButtonsProps) {
  return (
    <div className={styles.buttons}>
      {onCheck ? (
        <>
          <Button style={styles.negative} value='다시입력' onClick={onReset} />
          <Button style={styles.positive} value='제출하기' onClick={onSubmit} />
        </>
      ) : (
        <Button style={styles.positive} value='확 인' onClick={onEnter} />
      )}
    </div>
  );
}

interface ButtonProps {
  style: string;
  value: string;
  onClick: () => void;
}

export function Button({ style, value, onClick }: ButtonProps) {
  return (
    <div className={style}>
      <input onClick={onClick} type='button' value={value} />
    </div>
  );
}
