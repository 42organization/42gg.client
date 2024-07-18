import styles from 'styles/agenda/button/Buttons.module.scss';

const CancelBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.CancelBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const ShareBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.ShareBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const BackwardBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.BackwardBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const ForwardBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.ForwardBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const AddElementBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.AddElementBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const RemoveElementBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.RemoveElementBtn} onClick={(e) => onClick(e)}>
      <span className='icon' />
    </button>
  );
};

const DragBtn = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.DragBtn} onClick={(e) => onClick(e)}>
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
  DragBtn,
};
