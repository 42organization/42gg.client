import styles from 'styles/mode/IsMineCheckBox.module.scss';

interface IsMineCheckBox {
  isMine: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IsMineCheckBox({ isMine, onChange }: IsMineCheckBox) {
  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        id='isMine'
        name='isMine'
        onChange={onChange}
        checked={isMine}
      />
      <label htmlFor='isMine'>
        <span></span>
        <div>내 기록</div>
      </label>
    </div>
  );
}
