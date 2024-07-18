import Upload from 'public/image/agenda/upload.svg';
import styles from 'styles/agenda/button/UploadButton.module.scss';

interface UploadButtonProps {
  text: string;
}

export default function UploadButton({ text }: UploadButtonProps) {
  return (
    <div className={styles.AddButton}>
      <span>{text}</span>
      <Upload />
    </div>
  );
}
