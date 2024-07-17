import styles from 'styles/agenda/button/Buttons.module.scss';

const CancelBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.CancelBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

const ShareBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.ShareBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

const BackwardBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.BackwardBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

const ForwardBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.ForwardBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

const AddElementBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.AddElementBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

const RemoveElementBtn = ({
  func,
}: {
  func: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.RemoveElementBtn} onClick={(e) => func(e)}>
      <span className='icon' />
    </button>
  );
};

export {
  CancelBtn,
  ShareBtn,
  BackwardBtn,
  ForwardBtn,
  AddElementBtn,
  RemoveElementBtn,
};
