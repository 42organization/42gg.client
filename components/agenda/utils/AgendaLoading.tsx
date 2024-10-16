import styles from 'styles/agenda/utils/AgendaLoading.module.scss';

const AgendaLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle} />
    </div>
  );
};

export default AgendaLoading;
