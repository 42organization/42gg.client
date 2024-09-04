import Image from 'next/image';
import { agendaModal } from 'types/agenda/modalTypes';
import { useModal } from 'components/agenda/modal/useModal';
import styles from 'styles/agenda/modal/modal.module.scss';

const NoticeModal = (props: agendaModal) => {
  const { title, description, onProceed, image } = props;
  const { handleProceed } = useModal();

  return (
    <>
      <div className={styles.modalContainer}>
        {title && (
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={styles.contentContainer}>
          <p>{description}</p>
          {image && (
            <>
              <Image
                className={styles.contentWarp}
                src={image}
                alt='poster'
                layout='responsive'
                width={300}
                height={300}
              />
            </>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleProceed(onProceed)}>확인</button>
        </div>
      </div>
    </>
  );
};

export default NoticeModal;
