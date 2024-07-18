import Image from 'next/image';
import styles from 'styles/agenda/Home/MyAgendaBtn.module.scss';

const MyAgendaBtn = () => {
  return (
    <button className={styles.myagendaBtn}>
      <div>my agenda</div>
      <div className={styles.imageWrapper}>
        <Image
          src='/image/agenda/ArrowRight.svg'
          width={35}
          height={35}
          alt='Go To My Agenda'
          className={styles.imageBox}
        />
      </div>
    </button>
  );
};

export default MyAgendaBtn;
