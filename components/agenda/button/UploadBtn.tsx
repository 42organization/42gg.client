import Upload from 'public/image/agenda/upload.svg';
import styles from 'styles/agenda/button/UploadButton.module.scss';

interface UploadButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const UploadBtn = ({ text, onClick }: UploadButtonProps) => {
  return (
    <button className={styles.AddButton} onClick={(e) => onClick(e)}>
      <span>{text}</span>
      <Upload />
    </button>
  );
};

export { UploadBtn };
