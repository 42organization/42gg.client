import { UploadButtonProps } from 'types/agenda/button/uploadButtonTypes';
import Upload from 'public/image/agenda/upload.svg';
import styles from 'styles/agenda/button/UploadBtn.module.scss';

const UploadBtn = ({ text, onClick }: UploadButtonProps) => {
  return (
    <button className={styles.AddButton} onClick={(e) => onClick(e)}>
      <span>{text}</span>
      <Upload />
    </button>
  );
};

export { UploadBtn };
