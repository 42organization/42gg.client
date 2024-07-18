import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/agenda/Home/AgendaTitle.module.scss';

const AgendaTitle = () => {
  return (
    <div className={styles.agendaTitleContainer}>
      <div>AGENDA</div>
      <Link href={`/agenda/create`}>
        <button className={styles.agendaCreateBtn}>
          <div>개최신청</div>
          <div className={styles.imageWrapper}>
            <Image
              src='/image/agenda/ArrowRight.svg'
              width={35}
              height={35}
              alt='Create Agenda'
              className={styles.imageBox}
            />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default AgendaTitle;
